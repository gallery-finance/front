import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getContract, useActiveWeb3React} from "../../web3";
import ERC20 from "../../web3/abi/ERC20.json";
import {getGalleryAddress, getGLFStakingAddress} from "../../web3/address";
import Gallery from "../../web3/abi/Gallery.json";
import {
  HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
  HANDLE_SHOW_TRANSACTION_MODAL,
  HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
  waitingForConfirm,
  waitingForInit,
  waitingPending
} from "../../const";
import {mainContext} from "../../reducer";
import Web3 from "web3";
import {useProposals} from "./Hooks";

const {toWei} = Web3.utils

const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

export const WorkshopSubmitPage = () => {
  const {proposals} = useProposals()
  const {dispatch} = useContext(mainContext);
  const {account, library, chainId} = useActiveWeb3React()

  const [figure, setFigure] = useState()
  const [image, setImage] = useState()
  const [artwork, setArtwork] = useState()
  const [artist, setArtist] = useState()
  const [background, setBackground] = useState()
  const [errors, setErrors] = useState({figure: "", image: "", artwork: "", artist: ""})

  useEffect(() => {
    if (proposals.length !== 0 && !figure) {
      setFigure(proposals[0].id)
    }
  }, [proposals])

  const handleChange = event => {
    event.preventDefault();
    const {name, value} = event.target;

    switch (name) {
      case "figure":
        console.log('figure value', value)
        errors.figure = value === "" ? "You should select figure" : "";
        setFigure(value)
        break;
      case "image":
        console.log('image value', value)
        errors.image = value === "" ? "Artwork url cannot be empty" : "";
        setImage(value)
        break;
      case "artwork":
        setArtwork(value)
        errors.artwork =
            value.length < 1 ? "Artwork name cannot be empty" : "";
        break;
      case "artist":
        setArtist(value)
        errors.artist =
            value.length < 1 ? "Artist name cannot be empty" : "";
        break;
      case "background":
        setBackground(value)
      default:
        break;
    }
    setErrors(errors)
  };

  const handleSubmit = event => {
    console.log('infro', figure, image, artwork, artist, background)
    event.preventDefault();
    if (validateForm(errors)) {
      console.info("Valid Form");
      onSubmit()
    } else {
      console.error("Invalid Form");

    }
  };

  const onSubmit = async () => {
    const tokenContract = getContract(library, ERC20.abi, getGLFStakingAddress(chainId))
    const contract = getContract(library, Gallery.abi, getGalleryAddress(chainId))
    const weiAmount = toWei('10', 'ether');

    console.log('starting StakingBOT ETH', account, weiAmount)
    //setIsOpen(false)
    dispatch({
      type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
      showWaitingWalletConfirmModal: waitingForConfirm
    });
    try {
      const result = await tokenContract.methods.approve(
          getGalleryAddress(chainId),
          weiAmount,
      )
          .send({from: account});
      dispatch({
        type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
        showWaitingWalletConfirmModal: waitingForConfirm
      });

      await contract.methods.createFigure(figure, JSON.stringify({
        title: artwork,
        name: artist,
        image,
        description: background ? background : ''
      }))
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
              showWaitingWalletConfirmModal: waitingForInit
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
  };


  return (
      <>
        <div className="center">
          <ul className="breadcrumbs hidden-sm">
            <li className="breadcrumbs__item">
              <Link to="/" className="breadcrumbs__link">
                <span>Home</span>
              </Link>
            </li>

            <li className="breadcrumbs__item">
              <Link to="/workshop" className="breadcrumbs__link">
                <span>Workshops</span>
              </Link>
            </li>

            <li className="breadcrumbs__item">
              <Link to="/workshop/artwork" className="breadcrumbs__link">
                <span>Artwork</span>
              </Link>
            </li>
            <li className="breadcrumbs__item">
              <span>Submit</span>
              <link href="http://gf.wndrbase.com/workshop/voter"/>
            </li>
          </ul>
        </div>

        <article className="center">
          <form
              action="/"
              className="submit-artwork"
              onSubmit={handleSubmit}
          >
            <h1 className="submit-artwork__title h3">
              Submit an Artwork
            </h1>

            <div className="submit-artwork__select submit-artwork__inputbox">
              <label
                  htmlFor="submit-artwork-select"
                  className="submit-artwork__label"
              >
                Select the figure your art is for
              </label>

              <div className="select">
                <select
                    id="submit-artwork-select"
                    required
                    name="figure"
                    onChange={handleChange}
                    className={
                      errors.figure.length > 0
                          ? "input--error"
                          : undefined
                    }
                >
                  {proposals.map(item => {
                    return (
                        <option value={item.id}>{item.name}</option>
                    )
                  })}

                </select>
              </div>
              {errors.figure.length > 0 && (
                  <div className="submit-artwork__text-error">
                    You should select figure
                  </div>
              )}
            </div>

            <div className="submit-artwork__row">
              <div className="submit-artwork__row-item submit-artwork__inputbox">
                <input
                    className={`submit-artwork__input input ${
                        errors.image.length > 0 &&
                        "input--error"
                    }`}
                    placeholder="Artwork Url"
                    name="image"
                    value={image}
                    onChange={handleChange}
                    required
                />

                {errors.image.length > 0 && (
                    <div className="submit-artwork__text-error">
                      Url of the artwork can not be empty
                    </div>
                )}
              </div>

            </div>

            <div className="submit-artwork__drop submit-artwork__inputbox">
              <input
                  className="submit-artwork__drop-input"
                  type="file"
              />

              <div className="submit-artwork__drop-content">
                {image ? (
                    <img className="cover" content="no-referrer"  src={image}/>
                ) : (
                    <svg
                        className="submit-artwork__drop-logo"
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                    >
                      <path
                          d="M9.5 22.2v1.2l.85-.85L14 18.91l10.65 10.64.35.36.35-.36L32 22.91l5.65 5.64.85.86V9.5h-29v12.7zm.15 5.3l-.15.15V38.5h6.9l.15-.15 5.98-5.97.35-.35-.35-.35-8.18-8.18-.35-.35-.35.35-4 4zM21.5 37.65l-.85.85H38.5v-4.84l-.15-.16-6-6-.35-.35-.35.35L21.5 37.65zM8 6.5h32A1.5 1.5 0 0141.5 8v32a1.5 1.5 0 01-1.5 1.5H8A1.5 1.5 0 016.5 40V8A1.5 1.5 0 018 6.5zm23 13a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
                    </svg>
                )}


                {/*<p className="submit-artwork__drop-text">*/}
                {/*Drop your image here, or <b>browse</b>*/}
                {/*</p>*/}

                {/*<small className="submit-artwork__drop-format">*/}
                {/*Supports: JPG, JPEG2000, PNG*/}
                {/*</small>*/}
              </div>
            </div>

            <div className="submit-artwork__row">
              <div className="submit-artwork__row-item submit-artwork__inputbox">
                <input
                    className={`submit-artwork__input input ${
                    errors.artwork.length > 0 &&
                    "input--error"
                        }`}
                    placeholder="Artwork Name"
                    name="artwork"
                    value={artwork}
                    onChange={handleChange}
                    required
                />

                {errors.artwork.length > 0 && (
                    <div className="submit-artwork__text-error">
                      Name of the artwork can not be empty
                    </div>
                )}
              </div>

              <div className="submit-artwork__row-item submit-artwork__inputbox">
                <input
                    className={`submit-artwork__input input ${
                    errors.artist.length > 0 &&
                    "input--error"
                        }`}
                    placeholder="Artist name"
                    name="artist"
                    value={artist}
                    onChange={handleChange}
                    required
                />

                {errors.artist.length > 0 && (
                    <div className="submit-artwork__text-error">
                      Name of the artist can not be empty
                    </div>
                )}
              </div>
            </div>

            <div className="submit-artwork__textarea submit-artwork__inputbox">
              <label
                  htmlFor="submit-artwork-textarea"
                  className="submit-artwork__label"
              >
                Background
              </label>

              <textarea
                  className="submit-artwork__input input"
                  id="submit-artwork-textarea"
                  placeholder="no more than 200 caharcters"
                  name="background"
                  value={background}
                  onChange={handleChange}
              />
            </div>

            <p className="submit-artwork__note">
              You need to stake <b>10 tokens for 7 days</b> to submit
              your art piece. You can submit more than one art piece.
            </p>

            <button className="submit-artwork__btn btn" type="button" onClick={handleSubmit}>Confirm</button>
          </form>
        </article>
      </>
  );
}
