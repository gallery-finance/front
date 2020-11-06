import React, { useContext, useState } from "react";

import BigNumber from "bignumber.js";
import {getContract, useActiveWeb3React} from "../../web3";
import ERC20 from "../../web3/abi/ERC20.json";
import Minter from "../../web3/abi/Minter.json";
import Web3 from "web3";
import {promisify} from '../../utils/promisify';

import {fetchApi} from '../../utils/fetchApi'

import { useHistory } from "react-router-dom";
import {mainContext} from "../../reducer";
import { BackButton } from "../../components/BackButton";
import { CropImageModal } from "../../components/Modals";
import {getNFTTokenAddress, getGLFStakingAddress} from "../../web3/address";

import {
    HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
    HANDLE_SHOW_TRANSACTION_MODAL,
    HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
    waitingForConfirm,
    waitingForInit,
    waitingPending
} from "../../const";

// TODO remove hardcode
var PRICE_TOKEN = '0.01';

function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

class TokenPublisher {
  constructor(onChange){
    this.onChange = onChange
    this.metadata = {}
    this.errors = {
        name: "",
        artist: "",
        hashtags: ""
    };

    this.onSubmit = this.onSubmit.bind(this)
    this.openImage = this.openImage.bind(this)
    this.setCropModalOpen = this.setCropModalOpen.bind(this)
    this.setCroppedImage = this.setCroppedImage.bind(this)
  }

  showWalletConfirmModal(options){
    this.dispatch({
        type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
        showWaitingWalletConfirmModal: options || waitingForConfirm
    });
  }

  closeWalletConfirmModal(){
    this.dispatch({
        type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
        showWaitingWalletConfirmModal: {show: false}
    });
  }

  showTxConfirmModal(hash){
    this.dispatch({
        type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
        showWaitingWalletConfirmModal: {...waitingPending, hash}
    });
  }

  showErrorModal(){
    this.dispatch({
        type: HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
        showFailedTransactionModal: true
    });
  }

  openImage(ev){
    var files = ev.target.files
    if (files && files.length !== 0) {
      this.file = files[0]
      this.setCropModalOpen(true)
      this.image = URL.createObjectURL(this.file)
      /*
      var reader = new FileReader();
      reader.onload = () => {
        this.image = reader.result;
        this.onChange()
      }
      reader.readAsDataURL(this.file);
      */
    }

  }

  async getBalance(){

      console.log('account', this.account)

      //var nonce = await promisify(this.web3.eth.getTransactionCount)(this.account)
      //console.log({account: this.account, nonce})
      //var allowance = await tokenContract.methods.allowance(this.account, nftAddress).call()


      console.log('get balance')
      this.balance = new BigNumber(await this.tokenContract.methods.balanceOf(this.account).call())
      console.log('get decimals')
      this.decimals = await this.tokenContract.methods.decimals().call()
      if(typeof(this.decimals) == 'string'){
        this.decimals = parseInt(this.decimals)
      }
      console.log('this.decimals', this.decimals, typeof(this.decimals))
      this.balanceInToken = this.balance.shiftedBy(-this.decimals)
      this.onChange()
  }

  setWeb3(web3React){
    console.log('web3React', web3React)
    if(web3React && web3React.library){
      this.account = web3React.account
      this.library = web3React.library
      this.web3 = new Web3(this.library.provider);
      this.chainId = web3React.chainId
      var tokenAddress = getGLFStakingAddress(this.chainId)
      this.nftAddress = getNFTTokenAddress(this.chainId)
      this.tokenContract = getContract(this.library, ERC20.abi, tokenAddress)
      this.minterContract = getContract(this.library, Minter.abi, this.nftAddress)
      if(this.balance == null){
        this.getBalance()
      }
    }
  }

  setDispath(dispatch){
    this.dispatch = dispatch
  }

  setHistory(history){
    this.history = history
  }

  setMetadata(name, value){
    console.log('setting metadata', name, value)
    this.metadata[name] = value
    this.errors = {
        name: "",
        artist: "",
        hashtags: ""
    };
    switch(name){
      case 'name':
        this.errors.name =
            value.length < 1 ? "Artwork name cannot be empty" : "";
        break;
      case 'artist':
        this.errors.artist =
            value.length < 1 ? "Artist name cannot be empty" : "";
        break;

    }
    //this.errors.hashtags = value.length < 1 ? "Hashtags cannot be empty" : "";


    this.onChange()
  }

  isValid(){
    return this.balance != null && 
           this.croppedImage != null && this.errors.name.length == 0 &&
           this.errors.artist.length == 0
  }


  dispose(){
  }

  onSubmit(){
    console.log('onSubmit')
    this.publish()
  }

  async publish(){

    try {

      this.showWalletConfirmModal({show: true, title: 'Checking balance'})

      console.log('account', this.account)

      //var nonce = await promisify(this.web3.eth.getTransactionCount)(this.account)
      //console.log({account: this.account, nonce})
      //var allowance = await tokenContract.methods.allowance(this.account, nftAddress).call()

      console.log('publish this.decimals', this.decimals, typeof(this.decimals))
      console.log('publish PRICE TOKEN', typeof(PRICE_TOKEN), PRICE_TOKEN)
      var price = new BigNumber(PRICE_TOKEN).shiftedBy(this.decimals)



      console.log('checking balance...')
      if(this.balance.lt(price)){
        console.log('balance lt price')
        // TODO show error
        //this.setPublishMessage('Insufficient token balance: required ' + PRICE_TOKEN + 
        //  ', but your have just ' + this.balanceInToken.toString(), true)
        //return
      }
      console.log('balance ok')

      this.showWalletConfirmModal()

      var txApprove = this.tokenContract.methods.approve(
        this.nftAddress,
        price.toString()
      ).send({from: this.account})
        .on('transactionHash', (hash) => {
          this.showTxConfirmModal(hash)
        })
        .on('error', (err, receipt) => {
          this.showErrorModal()
        })

      console.log('txApprove', txApprove)

      txApprove.on('receipt', async () => {
        this.showWalletConfirmModal()
        var txMint = await this.minterContract.methods.mint()
          .send({from: this.account})
          .on('transactionHash', (hash) => {
            this.showTxConfirmModal(hash)
          })
          .on('receipt', (receipt) => {
            var events = receipt.events
            if(events.Mint && events.Mint.returnValues){
              var tokenId = events.Mint.returnValues.tokenId
              this.uploadMetadata(tokenId, receipt)
            } else {
              // TODO provide error message
              // Error: token was not issued
              this.showErrorModal()
            }
          })
          .on('error', (err, receipt) => {
            this.showErrorModal()
          })
      })
    
    } catch (e) {
      console.log('e', e)
      // TODO: provide error message e.message
      this.showErrorModal()
    }


  }

  setCropModalOpen(isOpen){
    this.cropModalOpen = isOpen
    this.onChange()
  }

  setCroppedImage(image){
    this.croppedImage = image
    this.onChange()
  }

  async uploadMetadata(tokenId, receipt){
    console.log('uploading meta for token Id', tokenId)

    this.showWalletConfirmModal({show: true, title: 'Uploading metadata'})


    var params = {...this.metadata}
    params.tokenId = tokenId
    params.owner = this.account
    console.log('receipt', receipt)
    params.txHash = receipt.transactionHash

    var formData = new FormData();


    for(var k in params){
      console.log('append', k)
      formData.append(k,params[k]);
    }

    formData.append('image', this.file)
    formData.append('preview', dataURLtoBlob(this.croppedImage))

    var resp = await fetchApi('tokens', {
      method: 'POST',
      body: formData,
    })
    this.closeWalletConfirmModal()
    this.history.push("/exhibition-hall/" + tokenId)
  }
}


const ExhibitionHallPublishPageView = ({publisher}) => {

    let web3React = useActiveWeb3React();
    publisher.setWeb3(web3React)

    const {dispatch} = useContext(mainContext);
    publisher.setDispath(dispatch)
    
    let history = useHistory()
    publisher.setHistory(history)

    const handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        publisher.setMetadata(name,value)
    };

    var errors = publisher.errors
    var {name,hashtags,description,artist} = publisher.metadata

    return (
        <article className="center">
            <BackButton toExhibitionHall />

            <form action="/" className="publish-artwork" onSubmit={publisher.onSubmit}>
                <h1 className="publish-artwork__title h3">Publish an Artwork</h1>

                <div className="publish-artwork__buy-wrapper">
                    <div>
                        <button
                            className="btn publish-artwork__buy-btn"
                            type="button"
                        >
                            Buy GLF
                        </button>
                        <p className="publish-artwork__buy-caption">
                            Buy GLF tokens now on Uniswap
                        </p>
                    </div>
                    <div>
                        <svg
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M2 9.5H21C21.2652 9.5 21.5196 9.60536 21.7071 9.79289C21.8946 9.98043 22 10.2348 22 10.5V20.5C22 20.7652 21.8946 21.0196 21.7071 21.2071C21.5196 21.3946 21.2652 21.5 21 21.5H3C2.73478 21.5 2.48043 21.3946 2.29289 21.2071C2.10536 21.0196 2 20.7652 2 20.5V9.5ZM3 3.5H18V7.5H2V4.5C2 4.23478 2.10536 3.98043 2.29289 3.79289C2.48043 3.60536 2.73478 3.5 3 3.5ZM15 14.5V16.5H18V14.5H15Z"
                                fill="#FAD06A"
                            />
                        </svg>
                        <p className="gold-color">Your balance: <span> </span>
                          {publisher.balanceInToken == null ? 'loading' : publisher.balanceInToken.toString()}
                        </p>
                    </div>
                </div>

                <div className="publish-artwork__drop publish-artwork__inputbox">
                    <input
                        className="publish-artwork__drop-input"
                        type="file"
                        accept="image/png, image/jpg, image/jpeg"
                        onChange={publisher.openImage}
                    />
                    <div className="publish-artwork__drop-content">
                        {publisher.croppedImage ? (
                            <img className="cover" src={publisher.croppedImage} />
                        ) : (
                            <>
                                <svg
                                    className="publish-artwork__drop-logo"
                                    width="48"
                                    height="48"
                                    viewBox="0 0 48 48"
                                >
                                    <path d="M9.5 22.2v1.2l.85-.85L14 18.91l10.65 10.64.35.36.35-.36L32 22.91l5.65 5.64.85.86V9.5h-29v12.7zm.15 5.3l-.15.15V38.5h6.9l.15-.15 5.98-5.97.35-.35-.35-.35-8.18-8.18-.35-.35-.35.35-4 4zM21.5 37.65l-.85.85H38.5v-4.84l-.15-.16-6-6-.35-.35-.35.35L21.5 37.65zM8 6.5h32A1.5 1.5 0 0141.5 8v32a1.5 1.5 0 01-1.5 1.5H8A1.5 1.5 0 016.5 40V8A1.5 1.5 0 018 6.5zm23 13a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                                </svg>
                                <p className="publish-artwork__drop-text">
                                    Drop your image here, or <b>browse</b>
                                </p>
                                <small className="publish-artwork__drop-format">
                                    Supports: JPG, JPEG2000, PNG
                                </small>
                            </>
                        )}
                    </div>
                </div>

                <div className="publish-artwork__row">
                    <div className="publish-artwork__row-item publish-artwork__inputbox">
                        <input
                            className={`publish-artwork__input input ${
                                errors.name.length > 0 && "input--error"
                            }`}
                            placeholder="Artwork Name"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            required
                        />
                        {errors.name.length > 0 && (
                            <div className="publish-artwork__text-error">
                                Name of the artwork can not be empty
                            </div>
                        )}
                    </div>
                    <div className="publish-artwork__row-item publish-artwork__inputbox">
                        <input
                            className={`publish-artwork__input input ${
                                errors.artist.length > 0 && "input--error"
                            }`}
                            placeholder="Artist name"
                            name="artist"
                            value={artist}
                            onChange={handleChange}
                            required
                        />
                        {errors.artist.length > 0 && (
                            <div className="publish-artwork__text-error">
                                Name of the artist can not be empty
                            </div>
                        )}
                    </div>
                </div>

                <div className="publish-artwork__inputbox">
                    <input
                        className={`publish-artwork__input input ${
                            errors.hashtags.length > 0 && "input--error"
                        }`}
                        placeholder="Hashtags"
                        name="hashtags"
                        value={hashtags}
                        onChange={handleChange}
                        required
                    />
                    {errors.hashtags.length > 0 && (
                        <div className="publish-artwork__text-error">
                            Hashtags can not be empty
                        </div>
                    )}
                </div>

                <div className="publish-artwork__textarea publish-artwork__inputbox">
                    <label
                        htmlFor="publish-artwork-textarea"
                        className="publish-artwork__label"
                    >
                        Details
                    </label>
                    <textarea
                        className="publish-artwork__input input"
                        id="publish-artwork-textarea"
                        placeholder="no more than 200 caharcters"
                        name="description"
                        value={description}
                        onChange={handleChange}
                    />
                </div>

                <p className="publish-artwork__note">
                    Cost of publication is <b> {PRICE_TOKEN} in GLF</b> tokens. We will create
                    an NFT token and send it to your wallet. Published artwork will
                    be stored in the decentralized storage forever, with no
                    additional cost.
                </p>

                <button
                    className="publish-artwork__btn btn"
                    type="button"
                    onClick={publisher.onSubmit}
                    disabled={!publisher.isValid()}
                >
                    Publish
                </button>
            </form>

            {publisher.cropModalOpen && (
                <div className="modal-show">
                    <div className="wrapper">
                        <CropImageModal
                            setCropModalOpen={publisher.setCropModalOpen}
                            tempImage={publisher.image}
                            setCroppedImage={publisher.setCroppedImage}
                        />
                    </div>
                </div>
            )}
        </article>
    );
};

export class ExhibitionHallPublishPage extends React.Component {

  componentWillMount(){
    this.publisher = new TokenPublisher(() => this.forceUpdate())
  }

  componentWillUnmount(){
    this.publisher.dispose()
  }

  render(){
    return <ExhibitionHallPublishPageView publisher={this.publisher}/>
  }
}

