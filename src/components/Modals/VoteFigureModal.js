import React from "react";
import {formatAmount} from "../../utils/format";
import {CrossModalIcon} from "../../icons";

export const VoteFigureModal = ({setVoteOpen, balance, proposal, onCancel, onConfirm, voteAmount, onChange}) => {
    return (
        <div className="modal">
            <div className="modal__box">
                <div className="modal__item modal__item--vote">
                    <form
                        className="form-vote-new form-app"
                        action="/"
                        noValidate="novalidate"
                    >
                        <h3 className="modal__title h3">Vote for a Figure</h3>

                        <table className="form-vote__table">
                            <tbody>
                            <tr>
                                <th>Name:</th>
                                <td>{proposal && proposal.name}</td>
                            </tr>

                            <tr>
                                <th>Details:</th>
                                <td>
                                    {proposal && proposal.info}
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <div className="form-vote__inputbox form-app__inputbox">
                            <div className="form-app__inputbox-control">
                                <div className="form-app__inputbox-input">
                                    <input
                                        value={voteAmount}
                                        onChange={(e) => {
                                            onChange(e.target.value)
                                        }}
                                        className="input" placeholder="0.0000"/>
                                </div>

                                <div className="form-app__inputbox-up">
                                    <div className="form-app__inputbox-up-pref">
                                        Max
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="form-app__inputbox-after-text">
                            {`Voting Power: ${balance && formatAmount(balance)} GLF tokens`}
                        </p>

                        <p className="form-app__note">
                            GLF tokens used for this vote will be staked for
                            4&nbsp;days.
                        </p>

                        <div className="form-app__submit form-app__submit--row">
                            <button
                                className="btn btn--outline btn--medium modal__close"
                                type="button"
                                onClick={()=>{setVoteOpen(false)}}
                            >
                                Cancel
                            </button>

                            <button type="button" className="btn btn--medium" onClick={onConfirm}>Confirm</button>
                        </div>
                    </form>
                </div>

                <button
                    type="button"
                    className="modal__close modal__close-btn button"
                    aria-label="Close modal"
                    onClick={() => setVoteOpen(false)}
                >
                    <CrossModalIcon />
                </button>
            </div>
        </div>
    );
};
