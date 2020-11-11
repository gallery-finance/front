import React, {useContext, useEffect, useState} from "react";
import Web3 from 'web3'
import {formatAmount} from "../../utils/format";
import {useGLFBalance} from "../../pages/Hooks";
import { getPoolLeftTime} from "../../utils/time";
import {getContract, useActiveWeb3React} from "../../web3";
import ERC20 from "../../web3/abi/ERC20.json";
import {getEnglishAuctionNFTAddress, getGLFStakingAddress} from "../../web3/address";
import {
  HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
  HANDLE_SHOW_TRANSACTION_MODAL,
  HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
  waitingForConfirm,
  waitingForInit,
  waitingPending
} from "../../const";
import EnglishAuctionNFT from "../../web3/abi/EnglishAuctionNFT.json";
import {mainContext} from "../../reducer";
import {useBiddenStatus, useCreatorStatus} from "../../pages/Auction/Hooks";

const {toWei, fromWei} = Web3.utils

export const AuctionDetailsModal = ({item, setIsOpen}) => {

  console.log('bid pool', item)

  const {active, account, library, chainId} = useActiveWeb3React()
  const {dispatch} = useContext(mainContext);
  const {bidden, biddenAmount, winner, claimed} = useBiddenStatus(item.index)
  const {hasWinner, creatorClaimed} = useCreatorStatus(item.index, item.isMine, item.status === 'closed')
  const {glfBalance} = useGLFBalance()
  const [left, setLeft] = useState()
  const [bidAmount, setBidAmount] = useState()

  let timer
  useEffect(() => {
    timer = setInterval(() => {
      const left = getPoolLeftTime(item.closeAt)
      setLeft(left)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [getPoolLeftTime()])

  const onBid = async () => {
    console.log('on submit')
    if (!bidAmount) {
      return
    }
    const contract = getContract(library, EnglishAuctionNFT.abi, getEnglishAuctionNFTAddress(chainId))
    const tokenContract = getContract(library, ERC20.abi, getGLFStakingAddress(chainId))

    console.log('vote for proposal', '', toWei(bidAmount))
    setIsOpen(false)
    try {
      dispatch({
        type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
        showWaitingWalletConfirmModal: waitingForConfirm
      });
       await tokenContract.methods.approve(
           getEnglishAuctionNFTAddress(chainId),
          toWei(bidAmount),
      )
          .send({from: account});

      dispatch({
        type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
        showWaitingWalletConfirmModal: waitingForConfirm
      });

      await contract.methods.bid(item.index, toWei(bidAmount))
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

  const onClaim = (func) => {
    const contract = getContract(library, EnglishAuctionNFT.abi, getEnglishAuctionNFTAddress(chainId))
    try {
      dispatch({
        type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
        showWaitingWalletConfirmModal: waitingForConfirm
      });
      setIsOpen(false)
      contract.methods[func](item.index)
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



  const getMyPoolInfo = () => {
    return (
        <>
          <hr/>
          <table className="form-vote__table auction-details__bid">
            <tbody>
            <tr>
              <th>Time left:</th>
              <td>{left && `${left.days}d : ${left.hours}h : ${left.minutes}m`}</td>
            </tr>
            <tr>
              <th>Current auction price:</th>
              <td>{formatAmount(item.currentPrice)} GLF</td>
            </tr>
            </tbody>
          </table>
          {/*<div className="form-app__submit">*/}
          {/*  <button*/}
          {/*      className="btn btn--outline btn--medium modal__close"*/}
          {/*      type="button"*/}
          {/*      onClick={() => setIsOpen(false)}*/}
          {/*  >*/}
          {/*    OK*/}
          {/*  </button>*/}
          {/*</div>*/}
        </>
    );
  };


  const getUserBidInfo = () => {
    return (
        <>
          <hr/>
          <table className="form-vote__table auction-details__bid">
            <tbody>
            <tr>
              <th>Time left:</th>
              <td>{left && `${left.days}d : ${left.hours}h : ${left.minutes}m`}</td>
            </tr>
            <tr>
              <th>Current auction price:</th>
              <td>{formatAmount(item.currentPrice)} GLF</td>
            </tr>
            <tr>
              <th>Your current bid amount:</th>
              <td>{formatAmount(biddenAmount)} GLF</td>
            </tr>
            </tbody>
          </table>
          {/*<div className="form-app__submit">*/}
          {/*  <button*/}
          {/*      className="btn btn--outline btn--medium modal__close"*/}
          {/*      type="button"*/}
          {/*      onClick={() => setIsOpen(false)}*/}
          {/*  >*/}
          {/*    OK*/}
          {/*  </button>*/}
          {/*</div>*/}
        </>
    );
  };

  const getPurchaseStatus = () => {
    return (
        <>
          <hr/>
          <table className="form-vote__table auction-details__bid">
            <tbody>
            <tr>
              <th>The auction is closed:</th>
              <td>0d : 0h : 0m</td>
            </tr>
            <tr>
              <th>Current auction price:</th>
              <td>{formatAmount(item.currentPrice)} GLF</td>
            </tr>
            <tr>
              <th>Your current bid amount:</th>
              <td>{formatAmount(biddenAmount)} GLF</td>
            </tr>
            </tbody>
          </table>
          <hr/>
          {winner.toLowerCase() === account.toLowerCase() ? (
              <p className="auction-details__result result--green">You have successfully purchased the item</p>
          ) : (
              <p className="auction-details__result result--red">Sorry, you have not purchased the item</p>
          )}
          <div className="form-app__submit">
            { !claimed && (
                <button
                    className="btn btn--medium modal__close"
                    type="button"
                    onClick={() => onClaim('bidderClaim')}
                >
                  {(winner.toLowerCase() === account.toLowerCase()) ? "Claim my NFT" : "Claim my GLFs"}
                </button>
            )}
          </div>
        </>
    );
  };

  const getCreatorStatus = () => {
    return (
        <>
          {hasWinner ? (
              <p className="auction-details__result result--green">You have successfully purchased the item</p>
          ) : (
              <p className="auction-details__result result--red">Sorry, you have not purchased the item</p>
          )}
          <div className="form-app__submit">
            { !creatorClaimed && (
                <button
                    className="btn btn--medium modal__close"
                    type="button"
                    onClick={() => onClaim('creatorClaim')}
                >
                  {(!hasWinner) ? "Claim my NFT" : "Claim my GLFs"}
                </button>
            )}
          </div>
        </>
    );
  };


  const getFormForPurchase = () => {
    return (
        <>
          <hr/>
          <table className="form-vote__table auction-details__bid">
            <tbody>
            <tr>
              <th>Time left:</th>
              <td>{left && `${left.days}d : ${left.hours}h : ${left.minutes}m`}</td>
            </tr>
            <tr>
              <th>Current auction price:</th>
              <td>{formatAmount(item.currentPrice)} GLF</td>
            </tr>
            </tbody>
          </table>
          <hr/>
          <div className="auction__inputbox form-app__inputbox">
            <p className="form-app__label align-center opacity-60">
              Your Bid Amount
            </p>
            <div className="form-app__inputbox-control">
              <div className="form-app__inputbox-input">
                <input value={bidAmount} onChange={(e)=>{
                  setBidAmount(e.target.value)
                }} className="input" placeholder="0.0000"/>
              </div>
              <div className="form-app__inputbox-up">
                <div className="form-app__inputbox-up-pref" onClick={()=>{
                  console.log('on max',fromWei(glfBalance) )
                  setBidAmount(fromWei(glfBalance))
                }}>Max</div>
              </div>
            </div>
          </div>
          <p className="form-app__inputbox-after-text">
            Balance: {glfBalance && formatAmount(glfBalance)} GLF tokens
            <br/>
          </p>
          <div className="form-app__submit form-app__submit--row">
            <button
                className="btn btn--outline btn--medium"
                type="button"
                onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
                type="button"
                className="btn btn--medium"
                onClick={onBid}
            >
              Confirm
            </button>
          </div>
        </>
    );
  };

  return (
      <div className="modal">
        <div className="modal__box">
          <div className="modal__item">
            <form
                className="form-vote-new form-app"
                action="/"
                noValidate="novalidate"
            >
              <div className="auction-details__title">
                <h3 className="modal__title h3">{item.isMine? 'My pool status': 'Auction Details'}</h3>
                <div
                    className={`auction-details__type auction-details__type--${item.type}`}
                >
                  {item.type}
                </div>
              </div>
              <div className="auction-details__image-wrapper">
                <div className="form-vote-new__img auction-details__image">
                  <picture>
                    <img
                        src={item.image}
                        alt=""
                        loading="lazy"
                        width="180"
                        height="115"
                    />
                  </picture>
                </div>
                <div className="auction-details__price">
                  <div>
                    <p>Starting price:</p>
                    <h4>1 GLF = {formatAmount(item.amountMin1)} ETH</h4>
                  </div>
                  <div>
                    <p>Minimal bid price increment:</p>
                    <h4>{formatAmount(item.amountMin1)} GLF</h4>
                  </div>
                </div>
              </div>
              <table className="form-vote__table auction-details__table">
                <tbody>
                <tr>
                  <th>Name:</th>
                  <td>{item.name}</td>
                </tr>
                <tr>
                  <th>Details:</th>
                  <td>
                    {item.description}
                  </td>
                </tr>
                <tr>
                  <th>Token ID:</th>
                  <td>{item.tokenId}</td>
                </tr>
                {/*<tr>*/}
                {/*    <th>Contract address:</th>*/}
                {/*    <td className="table__token">*/}
                {/*        <a href="/">{item.token}</a>*/}
                {/*    </td>*/}
                {/*</tr>*/}
                </tbody>
              </table>
              {item.isMine && getMyPoolInfo()}

              {(!item.isMine && item.status === "live" && bidden) && getUserBidInfo()}

              {(!item.isMine && item.status === "live" && !bidden) && getFormForPurchase()}

              {(!item.isMine && item.status === "closed" && bidden) && getPurchaseStatus()}

              {(item.isMine && item.status === "closed") && getCreatorStatus()}

              {item.status !== "live" && (
                  <div className="form-app__submit">
                    <button
                        className="btn btn--outline btn--medium modal__close"
                        type="button"
                        onClick={() => setIsOpen(false)}
                    >
                      OK
                    </button>
                  </div>
              )}
              {/*{ item.status === "live" ? (*/}
              {/*    userPurchasedItem ? (*/}
              {/*        getUserBidInfo()*/}
              {/*    ) : auctionIsFinished ? (*/}
              {/*        getPurchaseStatus()*/}
              {/*    ) : (*/}
              {/*        getFormForPurchase()*/}
              {/*    )*/}
              {/*) : (*/}
              {/*    <div className="form-app__submit">*/}
              {/*      <button*/}
              {/*          className="btn btn--outline btn--medium modal__close"*/}
              {/*          type="button"*/}
              {/*          onClick={() => setIsOpen(false)}*/}
              {/*      >*/}
              {/*        OK*/}
              {/*      </button>*/}
              {/*    </div>*/}
              {/*)}*/}
              <button
                  type="button"
                  className="modal__close modal__close-btn button"
                  aria-label="Close modal"
                  onClick={() => setIsOpen(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path d="M14.5 10l7.39-7L24 5l-7.39 7L24 19l-2.11 2-7.39-7-7.39 7L5 19l7.39-7L5 5l2.11-2 7.39 7z"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
  );
};
