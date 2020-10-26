import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import Web3 from 'web3'
import {VoterItem} from "../../components/Workshop";
import {ProposeFigureModal, VoteFigureModal} from "../../components/Modals";
import {getContract, useActiveWeb3React} from "../../web3";
import ERC20 from "../../web3/abi/ERC20.json";
import {getGalleryAddress, getGLFStakingAddress} from "../../web3/address";
import Gallery from "../../web3/abi/Gallery.json";
import {
    HANDLE_SHOW_FAILED_TRANSACTION_MODAL, HANDLE_SHOW_TRANSACTION_MODAL,
    HANDLE_SHOW_WAITING_WALLET_CONFIRM_MODAL,
    waitingForConfirm,
    waitingForInit,
    waitingPending
} from "../../const";
import {mainContext} from "../../reducer";
import {useProposals} from "./Hooks";
import {formatAmount} from "../../utils/format";
import {useGLFBalance} from "../Hooks";

const {toWei} = Web3.utils

export const WorkshopVoterPage = () => {
    const {dispatch} = useContext(mainContext);
    const {account, library, chainId} = useActiveWeb3React()
    const {proposals} = useProposals()
    const {glfBalance} = useGLFBalance()


    const [isOpen, setIsOpen] = useState(false);
    const [voteOpen, setVoteOpen] = useState(false);
    const [name, setName] = useState();
    const [detail, setDetail] = useState();
    const [voteAmount, setVoteAmount] = useState();

    const [selectedProposal, setSelectedProposal] = useState();


    const onSubmit = async () => {
        if (!name || !detail) {
            return
        }
        const tokenContract = getContract(library, ERC20.abi, getGLFStakingAddress(chainId))
        const contract = getContract(library, Gallery.abi, getGalleryAddress(chainId))
        const weiAmount = toWei('50', 'ether');

        console.log('starting StakingBOT ETH', account, weiAmount)
        setIsOpen(false)
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

            await contract.methods.createProposal(name, detail)
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

    const onVote = async () => {
        console.log('on submit')
        if (!voteAmount) {
            return
        }
        const tokenContract = getContract(library, ERC20.abi, getGLFStakingAddress(chainId))
        const contract = getContract(library, Gallery.abi, getGalleryAddress(chainId))
        const weiAmount = toWei(voteAmount, 'ether');

        console.log('vote for proposal', selectedProposal, toWei(voteAmount))
        setVoteOpen(false)
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

            await contract.methods.voteForProposal(selectedProposal.id, toWei(voteAmount))
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
        <article className="center">
            <div className="center">
                <ul className="breadcrumbs hidden-sm">

                    <li className="breadcrumbs__item">
                        <Link to="/Workshop" className="breadcrumbs__link">
                            <span>Workshops</span>
                        </Link>
                    </li>

                    <li className="breadcrumbs__item">
                        <span>Figures</span>
                        <link href="http://gf.wndrbase.com/workshop/voter"/>
                    </li>
                </ul>
            </div>
            <header className="voter-head">
                <h1 className="voter-head__title h3">Figures</h1>
                <div className="voter-head__dashboard">
                    <div className="voter-head__dashboard-account">
                        <div className="voter-head__dashboard-ico">
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <path
                                    d="M2 9h19a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V9zm1-6h15v4H2V4a1 1 0 011-1zm12 11v2h3v-2h-3z"/>
                            </svg>
                        </div>
                        <Link to="/workshop/account" className="link line">
                            Account
                        </Link>
                    </div>
                    <div className="voter-head__dashboard-power">
                        <p>
                            Your Voting Power: <b>{glfBalance && formatAmount(glfBalance)} GLF</b>
                        </p>
                    </div>
                    <div className="voter-head__dashboard-btn" >
                        <button
                            disabled
                            style={{ backgroundColor: "#4a4a4a" }}
                            type="button"
                            className="btn"
                            onClick={() => setIsOpen(true)}
                        >
                            Propose a figure
                        </button>
                    </div>
                </div>
            </header>
            <div className="voter-table">
                <table>
                    <thead>
                    <tr>
                        <th>Ranking</th>
                        <th>Name</th>
                        <th className="voter-table__col-max-width hidden-sm">
                            Details
                        </th>
                        <th>Total Votes</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {proposals.map(item => {
                        return (
                            <VoterItem
                                ranking={1}
                                name={item.name}
                                details={item.info}
                                votes={formatAmount(item.votes)}
                                setVoteOpen={() => {
                                    setVoteOpen(true)
                                    setSelectedProposal(item)
                                }}
                            />
                        )
                    })}
                    </tbody>
                </table>
            </div>

            {isOpen && (
                <div className="modal-show">
                    <div className="wrapper">
                        <ProposeFigureModal onDetailChange={setDetail} onNameChange={setName} onSubmit={onSubmit}
                                            setIsOpen={setIsOpen}/>
                    </div>
                </div>
            )}
            {voteOpen && (
                <div className="modal-show">
                    <div className="wrapper">
                        <VoteFigureModal
                            onCancel={() => {
                                setVoteOpen(false)
                            }}
                            voteAmount={voteAmount}
                            onChange={setVoteAmount}
                            onConfirm={onVote}
                            proposal={selectedProposal}
                            balance={glfBalance}
                            setVoteOpen={setVoteOpen}/>
                    </div>
                </div>
            )}
        </article>
    );
};
