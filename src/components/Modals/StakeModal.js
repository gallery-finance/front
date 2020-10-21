import React  from "react";

import { GLFIcon } from "../../icons";
import {formatAmount} from "../../utils/format";

export const StakeModal = ({amount, onConfirm, onCancel, onChange, balance, icon, tokenName, symbol, onMax}) => {

    return (
        <div className="modal">
            <div className="modal__box">
                <form className="form-app" action="/">
                    <div className="form-app__inner deposit">
                        <h1 className="form-app__title h3">Stake</h1>

                        <div className="deposit__logo">
                            <GLFIcon width={43} height={43} />
                            {icon}
                        </div>

                        <p className="form-app__label align-center">
                            {tokenName}
                        </p>

                        <div className="deposit__inputbox form-app__inputbox">
                            <div className="form-app__inputbox-control">
                                <div className="form-app__inputbox-input">
                                    <input value={amount} className="input" placeholder="0.0000" onChange={onChange}/>
                                </div>

                                <div className="form-app__inputbox-up" onClick={onMax}>
                                    <div className="form-app__inputbox-up-pref">
                                        Max
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="form-app__inputbox-after-text">
                            Balance: {balance && formatAmount(balance)} {symbol} <br />
                        </p>

                        <div className="form-app__submit form-app__submit--row">
                            <button
                                className="btn btn--outline btn--medium"
                                type="button"
                                onClick={onCancel}
                            >
                                Cancel
                            </button>

                            <button type="button" className="btn btn--medium" onClick={onConfirm}>Confirm</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
