import React, {useContext, useEffect, useState} from "react";
import {mainContext} from "../../../reducer";
import cover from "../../../assets/img/card-pool/6.png";
import {formatAmount} from "../../../utils/format";
import {getPoolLeftTime} from "../../../utils/time";
import {getContract, useActiveWeb3React} from "../../../web3";
import EnglishAuctionNFT from "../../../web3/abi/EnglishAuctionNFT.json";
import {getEnglishAuctionNFTAddress} from "../../../web3/address";
import {
    HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
    HANDLE_SHOW_TRANSACTION_MODAL,
    HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
    waitingForConfirm,
    waitingForInit,
    waitingPending
} from "../../../const";

export const CheckPoolStatus = ({pool}) => {

    const {dispatch} = useContext(mainContext);
    const {active, account, library, chainId} = useActiveWeb3React()

    console.log('pool status',pool)

    const [left, setLeft] = useState()

    let timer
    useEffect(() => {
        timer = setInterval(() => {
            const left = getPoolLeftTime(pool.closeAt)
            setLeft(left)
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [getPoolLeftTime])

    const onClaim = () => {
        const contract = getContract(library, EnglishAuctionNFT.abi, getEnglishAuctionNFTAddress(chainId))
        try {
            dispatch({
                type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                showWaitingWalletConfirmModal: waitingForConfirm
            });

             contract.methods.creatorClaim(pool.index)
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


    const getPoolStatus = () => {
        return (
            <>
                <hr />
                <table className="form-vote__table auction-details__table">
                    <tbody>
                        <tr>
                            <th>The auction is closed:</th>
                            <td>{left && `${left.days}d : ${left.hours}h : ${left.minutes}m ${left.seconds}s`} </td>
                        </tr>
                    </tbody>
                </table>
                <hr />

                {pool.currentBiddenAmount !== "0" ? (
                    <p className="auction-details__result result--green">
                        Your item was successfully sold at the auction
                    </p>
                ) : (
                    <p className="auction-details__result result--red">
                        Sorry, your item was not sold at the auction
                    </p>
                )}

                {!pool.claimed && (
                    <div className="form-app__submit">
                        <button className="btn btn--medium check-pool-btn" type="button" onClick={onClaim}>
                            {pool.currentBiddenAmount !== "0" ? "Claim my GLFs" : "Claim my NFT"}
                        </button>
                    </div>
                )}

            </>
        );
    };

    const getTimeInfo = () => {
        return (
            <>
                <hr />
                <table className="form-vote__table auction-details__table">
                    <tbody>
                        <tr>
                            <th>Time left:</th>
                            <td>{left && `${left.days}d : ${left.hours}h : ${left.minutes}m : ${left.seconds}s`}</td>
                        </tr>
                    </tbody>
                </table>

                <div className="form-app__submit">
                    <button className="btn btn--outline btn--medium check-pool-btn" type="button">
                        Ok
                    </button>
                </div>
            </>
        );
    };

    return (
        <div className="auction-my-pool auction-my-pool--check">
            <div className="modal__box">
                <div className="modal__item">
                    <form
                        className="form-vote-new form-app"
                        action="/"
                        noValidate="novalidate"
                    >
                        <h3 className="modal__title h3">My current pool status</h3>
                        <div className="auction-details__image-wrapper">
                            <div className="form-vote-new__img auction-details__image">
                                <picture>
                                    <img
                                        src={pool.image}
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
                                    <h4>1 GLF = {formatAmount(pool && pool.amountMin1)} ETH</h4>
                                </div>
                                <div>
                                    <p>Minimal bid price increment:</p>
                                    <h4>1 GLF = {formatAmount(pool && pool.amountMinIncr1)} ETH</h4>
                                </div>
                            </div>
                        </div>
                        <table className="form-vote__table auction-details__table">
                            <tbody>
                                <tr>
                                    <th>Name:</th>
                                    <td>
                                        {pool && pool.name}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Details:</th>
                                    <td>
                                        {pool.description}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Token ID:</th>
                                    <td>{pool && pool.tokenId}</td>
                                </tr>
                                <tr>
                                    <th>Contract address:</th>
                                    <td className="table__token">
                                        <a href="/">
                                            0x84e517408ba6b891b9ac74b2f90013fcbc516d9d{pool.status}
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {pool.status !== 'closed' ? getPoolStatus() : getTimeInfo()}
                    </form>
                </div>
            </div>
        </div>
    );
};
