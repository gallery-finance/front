import React, {useContext, useState} from "react";

import { CrossModalIcon } from "../../icons";

import imgWebp1x from "../../assets/img/artwork-list/img.webp";
import imgWebp2x from "../../assets/img/artwork-list/img@2x.webp";
import img1x from "../../assets/img/artwork-list/img.jpg";
import img2x from "../../assets/img/artwork-list/img@2x.jpg";
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
import {useGLFBalance} from "../../pages/Hooks";
import {formatAmount} from "../../utils/format";

const {toWei} = Web3.utils


export const VoteModal = ({ setIsOpen, figure }) => {

    const {dispatch} = useContext(mainContext);
    const {account, library, chainId} = useActiveWeb3React()
    const {glfBalance}  =  useGLFBalance()
    const [voteAmount, setVoteAmount] = useState();


    const onVote = async () => {
        console.log('on submit')
        if (!voteAmount) {
            return
        }
        const tokenContract = getContract(library, ERC20.abi, getGLFStakingAddress(chainId))
        const contract = getContract(library, Gallery.abi, getGalleryAddress(chainId))
        const weiAmount = toWei(voteAmount, 'ether');

        console.log('vote for proposal', '', toWei(voteAmount))
        setIsOpen(false)
        try {
            dispatch({
                type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                showWaitingWalletConfirmModal: waitingForConfirm
            });
            const result = await tokenContract.methods.approve(
                getGalleryAddress(chainId),
                weiAmount,
            )
                .send({from: account});

            dispatch({
                type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                showWaitingWalletConfirmModal: waitingForConfirm
            });

            await contract.methods.voteForFigure(figure.id, toWei(voteAmount))
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
        <div className="modal">
            <div className="modal__box">
                <div className="modal__item modal__item--vote-img">
                    <form
                        className="form-vote-new form-app"
                        action="/"
                        noValidate="novalidate"
                    >
                        <h3 className="modal__title h3">Vote for a Artwork</h3>

                        <div className="form-vote-new__img">
                            <picture>
                                <img
                                    src={figure.info.image}
                                    alt="Starry Night"
                                    loading="lazy"
                                    width="180"
                                    height="115"
                                />
                            </picture>
                        </div>

                        <table className="form-vote__table">
                            <tbody>
                                <tr>
                                    <th>Name:</th>
                                    <td>
                                        {figure.info.title}
                                        <span className="opacity-60">
                                            by {figure.info.artist}
                                        </span>
                                    </td>
                                </tr>

                                <tr>
                                    <th>Details:</th>
                                    <td className="fz-14">
                                        {figure.info.description}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="form-vote__inputbox form-app__inputbox">
                            <div className="form-app__inputbox-control">
                                <div className="form-app__inputbox-input">
                                    <input className="input" placeholder="0.0000" onChange={(e)=>{
                                        setVoteAmount(e.target.value)
                                    }}/>
                                </div>

                                <div className="form-app__inputbox-up">
                                    <div className="form-app__inputbox-up-pref">
                                        Max
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="form-app__inputbox-after-text">
                            Voting Power: {glfBalance && formatAmount(glfBalance)} GLF tokens
                        </p>

                        <p className="form-app__note">
                            GLF tokens used for this vote will be staked for
                            7&nbsp;days.
                        </p>

                        <div className="form-app__submit form-app__submit--row">
                            <button
                                className="btn btn--outline btn--medium modal__close"
                                type="button"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </button>

                            <button className="btn btn--medium" type="button" onClick={onVote}>Confirm</button>
                        </div>
                    </form>
                </div>

                <button
                    type="button"
                    className="modal__close modal__close-btn button"
                    aria-label="Close modal"
                    onClick={() => setIsOpen(false)}
                >
                    <CrossModalIcon />
                </button>
            </div>
        </div>
    );
};
