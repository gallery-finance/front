import React, {useContext, useEffect, useState} from "react";

import cover from "../../../assets/img/card-pool/6.png";
import {validateForm} from "../../../utils/form";
import {getContract, useActiveWeb3React} from "../../../web3";
import ERC721 from '../../../web3/abi/ERC721.json'
import {
    getEnglishAuctionNFTAddress,
    getGalleryNFTAddress
} from "../../../web3/address";
import EnglishAuctionNFT from "../../../web3/abi/EnglishAuctionNFT.json";

import {
    HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
    HANDLE_SHOW_TRANSACTION_MODAL,
    HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
    waitingForConfirm,
    waitingForInit,
    waitingPending
} from "../../../const";
import {mainContext} from "../../../reducer";
import Web3 from "web3";
import {getTime} from "../../../utils/time";

const {toWei} = Web3.utils


export const CreatePool = () => {
    const {account, library, chainId} = useActiveWeb3React()
    const {dispatch} = useContext(mainContext);
    const [checked, setChecked] = useState(false);
    const [tokenId, setTokenId] = useState()
    const [name, setName] = useState()
    const [details, setDetails] = useState()
    const [price, setPrice] = useState()
    const [incr, setIncr] = useState()
    const [days, setDays] = useState()
    const [hours, setHours] = useState()
    const [minutes, setMinutes] = useState()

    const [errors, setErrors] = useState({tokenId: "", name: "", startPrice: "", artist: ""})

    useEffect(()=>{
        //errors.tokenId = "Token ID is invalid"
        //setErrors(errors)
    },[])

    const handleChange = async event => {
        event.preventDefault();
        const {name, value} = event.target;

        switch (name) {
            case "tokenId":
                setTokenId(value)
                setErrors({tokenId: ''})
                try {
                    const contract = getContract(library, ERC721.abi, getGalleryNFTAddress(chainId))
                    const ownerAddress = await contract.methods.ownerOf(value).call()
                    console.log('start query 1',ownerAddress.toLowerCase(),account.toLowerCase())

                    if (ownerAddress.toLowerCase() !== account.toLowerCase()) {
                        console.log('start query 2')
                        errors.tokenId =  "Token ID is invalid";
                    } else {
                        errors.tokenId =  "";
                        console.log('start query 3')
                    }
                }catch (e){
                    console.log('confirm token',e)
                    errors.tokenId = "Token ID is invalid"
                }

                break;
            case "name":
                setName(value)
            break
            case "details":
                setDetails(value)
            break
            case "price":
                setPrice(value)
            break
            case "days":
                setDays(value)
            break
            case "hours":
                setDays(value)
                break
            case "minutes":
                setDays(value)
                break
            default:
        }

        setErrors(errors)

    };


    const  handleSubmit = async (event) =>{
        event.preventDefault();
        console.log('handleSubmit', event)
        if (validateForm(errors)) {
            const tokenContract = getContract(library, ERC721.abi, getGalleryNFTAddress(chainId))
            const contract = getContract(library, EnglishAuctionNFT.abi, getEnglishAuctionNFTAddress(chainId))
            const weiPrice = toWei(price, 'ether');
            //const weiIncr = toWei(incr, 'ether');

            console.log('starting create pool', contract)
            //setIsOpen(false)
            dispatch({
                type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                showWaitingWalletConfirmModal: waitingForConfirm
            });
            try {
                await tokenContract.methods.approve(
                    getEnglishAuctionNFTAddress(chainId),
                    tokenId,
                )
                    .send({from: account});
                console.log('approve  success')

                dispatch({
                    type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                    showWaitingWalletConfirmModal: waitingForConfirm
                });

                const time = getTime(days, hours, minutes);
                console.log('data:',name, getGalleryNFTAddress(chainId),tokenId,weiPrice, 0.1,time)
                await contract.methods.create(
                    name,
                    getGalleryNFTAddress(chainId),
                    tokenId,
                    weiPrice,
                    1,
                    time)
                    .send({from: account})
                    .on('transactionHash', hash => {
                        dispatch({
                            type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                            showWaitingWalletConfirmModal: {...waitingPending, hash}
                        });
                    })
                    .on('receipt', (_, receipt) => {
                        console.log('BOT staking success')
                        dispatch({
                            type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                            showWaitingWalletConfirmModal: {...waitingForInit, link: '/workshop/artwork'}
                        });
                        dispatch({
                            type: HANDLE_SHOW_TRANSACTION_MODAL,
                            showTransactionModal: true
                        });
                    })
                    .on('error', (err, receipt) => {
                        console.log('BOT staking error', err)
                        dispatch({
                            type: HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
                            showFailedTransactionModal: true
                        });
                        dispatch({
                            type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                            showWaitingWalletConfirmModal: waitingForInit
                        });
                    })

            } catch (err) {
                dispatch({
                    type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                    showWaitingWalletConfirmModal: waitingForInit
                });
                if (err.code === 4001) {
                    dispatch({
                        type: HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
                        showFailedTransactionModal: true
                    });
                } else {
                    dispatch({
                        type: HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
                        showFailedTransactionModal: true
                    });
                }
                console.log('err', err);
            }
        } else {
            console.error("Invalid Form");

        }
    }

    return (
        <div className="auction-my-pool">
            <div className="modal__box">
                <div className="modal__item">
                    <form
                        id="auction-submit"
                        onSubmit={handleSubmit}
                        className="form-vote-new form-app"
                    >
                        <h3 className="modal__title h3">Create a new NFT auction</h3>
                        <div className="auction-details__image-wrapper">
                            <div className="form-vote-new__img auction-details__image">
                                <picture>
                                    <img
                                        src={cover}
                                        alt=""
                                        loading="lazy"
                                        width="180"
                                        height="115"
                                    />
                                </picture>
                            </div>
                            <div className="auction-my-pool__data">
                                <div>
                                    <p>Token ID:</p>
                                    <div className="form-app__inputbox-input">
                                        <input
                                            onChange={handleChange}
                                            required
                                            className="input input--sm"
                                            type="text"
                                            name="tokenId"
                                        />
                                        {errors.tokenId.length > 0 && (
                                            <div className="form-app__inputbox-input__text-error">
                                                {errors.tokenId}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="auction-my-pool__credits">
                            <div>
                                <p>Name of Auction:</p>
                                <div className="form-app__inputbox-input">
                                    <input
                                        name="name"
                                        onChange={handleChange}
                                        className="input input--sm"
                                        type="text" />
                                </div>
                            </div>
                            <div>
                                <p>Details:</p>
                                <div className="form-app__inputbox-input">
                                    <textarea className="input input--sm" />
                                </div>
                            </div>
                        </div>

                        <hr />
                        <div className="auction-my-pool__price">
                            <div className="auction-my-pool__price-row">
                                <p>Starting price (Floor price):</p>
                                <div className="auction-my-pool__price-input">
                                    <div className="form-app__inputbox-input">
                                        <input
                                            name={"price"}
                                            onChange={handleChange}
                                            className="input input--sm"
                                            placeholder="0,00"
                                            type="number"
                                            required
                                        />
                                    </div>
                                    GLF
                                </div>
                            </div>
                            <div className="auction-my-pool__price-row">
                                <label className="checkbox">
                                    <input
                                        checked={checked}
                                        onChange={() => {
                                            setChecked(prev => !prev);
                                        }}
                                        type="checkbox"
                                        className="checkbox__input visuallyhidden"
                                    />
                                    <span className="checkbox__label">
                                        Min bid price increment:
                                    </span>
                                </label>
                                <div className="auction-my-pool__price-input">
                                    <div className="form-app__inputbox-input">
                                        <input
                                            className="input input--sm"
                                            name="incr"
                                            onChange={handleChange}
                                            placeholder="0,00"
                                            type="number"
                                            disabled={!checked}
                                        />
                                    </div>
                                    GLF
                                </div>
                            </div>
                        </div>
                        <hr />

                        <div className="form-app__inputbox auction-my-pool__time">
                            <p className="auction-my-pool__time-title">
                                Pool running time:
                            </p>
                            <div className="form-app__inputbox-row">
                                <div>
                                    <p>Days</p>
                                    <div className="form-app__inputbox-input">
                                        <input
                                            name={"days"}
                                            onChange={handleChange}
                                            className="input input--sm"
                                            type="number"
                                            min={0}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p>Hours</p>
                                    <div className="form-app__inputbox-input">
                                        <input
                                            name="hours"
                                            onChange={handleChange}
                                            className="input input--sm"
                                            type="number"
                                            min={0}
                                            max={23}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p>Minutes</p>
                                    <div className="form-app__inputbox-input">
                                        <input
                                            className="input input--sm"
                                            name="minutes"
                                            onChange={handleChange}
                                            type="number"
                                            min={0}
                                            max={59}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-app__submit form-app__submit--row">
                            <button
                                className="btn btn--outline btn--medium"
                                type="button"
                            >
                                Cancel
                            </button>
                            <button type="submit" form="auction-submit"  className="btn btn--medium">
                                Launch
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
