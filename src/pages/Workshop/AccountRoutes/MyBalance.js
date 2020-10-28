import React, {useContext} from "react";

import {useAccount, useMyVote} from "../Hooks";
import {formatAmount, weiPlus} from "../../../utils/format";
import {getContract, useActiveWeb3React} from "../../../web3";
import {getGalleryAddress} from "../../../web3/address";
import Gallery from "../../../web3/abi/Gallery.json";
import {
    HANDLE_SHOW_FAILED_TRANSACTION_MODAL,
    HANDLE_SHOW_TRANSACTION_MODAL,
    HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
    waitingForConfirm,
    waitingForInit,
    waitingPending
} from "../../../const";
import {mainContext} from "../../../reducer";
import {useGLFBalance} from "../../Hooks";

export const MyBalance = () => {
    const {dispatch} = useContext(mainContext);
    const {account, library, chainId} = useActiveWeb3React()
    const {glfBalance} = useGLFBalance()
    const {proposalRewards, figureRewards, myProposalVotes, myFigureVotes} = useMyVote()

    const {rewardsTime} = useAccount()


    const onClaim = async () => {
        console.log('on submit')
        const contract = getContract(library, Gallery.abi, getGalleryAddress(chainId))
        try {
            dispatch({
                type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                showWaitingWalletConfirmModal: waitingForConfirm
            });

            await contract.methods.claimFromProposal()
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

    const onWithdraw = async () => {
        console.log('on submit')
        const contract = getContract(library, Gallery.abi, getGalleryAddress(chainId))
        try {
            dispatch({
                type: HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
                showWaitingWalletConfirmModal: waitingForConfirm
            });

            await contract.methods.withdrawFromProposal()
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
        <div className="tabs__item">
            <div className="account-balance">
                <table>
                    <tbody>
                    <tr>
                        <th className="account-balance__title">
                            My Voting Power:
                        </th>
                        <td className="account-balance__value">{glfBalance && formatAmount(glfBalance)} GLF</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th className="account-balance__title">
                            <div className="account-balance__lock">
                                My Voted Tokens:
                            </div>
                        </th>
                        <td className="account-balance__value">{(myProposalVotes || myFigureVotes) && formatAmount(weiPlus(myProposalVotes, myFigureVotes))} GLF</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th className="account-balance__title">
                            <div className="account-balance__unlock">
                                Tokens ready to unlock stage1:
                            </div>
                        </th>
                        <td className="account-balance__value">{myProposalVotes && formatAmount(myProposalVotes)} GLF</td>

                        <td className="account-balance__btn">
                            {(rewardsTime && rewardsTime < 0) ? (
                                <button
                                    className="btn btn--border btn--small"
                                    type="button"
                                    onClick={() => {
                                        if (rewardsTime && rewardsTime < 0) {
                                            onWithdraw()
                                        }
                                    }}
                                >
                                    Unlock tokens (stage1)
                                </button>
                            ) : null}

                        </td>
                    </tr>

                    <tr>
                        <th className="account-balance__title">
                            <div className="account-balance__unlock">
                                Tokens ready to unlock stage2:
                            </div>
                        </th>
                        <td className="account-balance__value">0 GLF</td>
                        <td className="account-balance__btn">
                            {/*<button*/}
                            {/*    className="btn btn--border btn--small"*/}
                            {/*    type="button"*/}
                            {/*    onClick={() => onWithdraw()}*/}
                            {/*>*/}
                            {/*    Unlock tokens (stage2)*/}
                            {/*</button>*/}
                        </td>
                    </tr>
                    <tr>
                        <th colSpan="3" className="account-balance__head">
                            Rewards
                        </th>
                    </tr>
                    <tr>
                        <th className="account-balance__title">
                            My rewards for Stage 1:
                        </th>
                        <td className="account-balance__value">{proposalRewards && formatAmount(proposalRewards)} GLF</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th className="account-balance__title">
                            My rewards for Stage 2:
                        </th>
                        <td className="account-balance__value">{figureRewards && formatAmount(figureRewards)} GLF</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan="3" className="account-balance__hr"></td>
                    </tr>
                    <tr>
                        <th className="account-balance__title">
                            <div className="account-balance__total">
                                Total rewards:
                            </div>
                        </th>
                        <td className="account-balance__value">{(proposalRewards || figureRewards) && formatAmount(weiPlus(proposalRewards, figureRewards))} GLF</td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>

                <button
                    className="btn account-balance__submit"
                    onClick={onClaim}
                >
                    Claim reward
                </button>
            </div>

        </div>
    );
};
