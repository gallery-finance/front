import React, {useContext} from "react";

import Web3 from 'web3'
import {getPercent} from "../../utils/time";
import {HANDLE_SHOW_TRANSACTION_MODAL} from "../../const";
import {mainContext} from "../../reducer";

const {fromWei} =Web3.utils

export const TransactionModal = ({}) => {
    const {dispatch, state} = useContext(mainContext);

    return (
        <div className="modal">
            <div className="modal__box">
                <form className="form-app" action="/">
                    <div className="form-app__inner transction-submitted">
                        <div className="emoji emoji--yay">
                            <div className="emoji__face">
                                <div className="emoji__eyebrows"/>
                                <div className="emoji__mouth"/>
                            </div>
                        </div>
                        <div className="form-app__title h3">
                            <p className="color-gray">
                                Congratulations!
                            </p>
                        </div>
                        <button
                            type="button"
                            className="transction-submitted__btn btn"
                            onClick={()=>{
                                dispatch({
                                    type: HANDLE_SHOW_TRANSACTION_MODAL,
                                    showTransactionModal: false
                                });
                            }}
                        >
                            Ok
                        </button>
                        <button
                            type="button"
                            className="form-app__close-btn button"
                            onClick={()=>{
                                dispatch({
                                    type: HANDLE_SHOW_TRANSACTION_MODAL,
                                    showTransactionModal: true
                                });
                            }}
                            aria-label="Close"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <path d="M14.5 10l7.39-7L24 5l-7.39 7L24 19l-2.11 2-7.39-7-7.39 7L5 19l7.39-7L5 5l2.11-2 7.39 7z"/>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};