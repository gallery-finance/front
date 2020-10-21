import React, { useState } from "react";

import { ClaimedTokensModal, UnlockedTokensModal } from "../../../components/Modals";

export const MyBalance = () => {
    const [claimOpen, setClaimOpen] = useState(false);
    const [unlockedOpen, setUnlockedOpen] = useState(false);

    return (
        <div className="tabs__item">
            <div className="account-balance">
                <table>
                    <tbody>
                        <tr>
                            <th className="account-balance__title">
                                My Voting Power:
                            </th>
                            <td className="account-balance__value">100 GLF</td>
                            <td></td>
                        </tr>
                        <tr>
                            <th className="account-balance__title">
                                <div className="account-balance__lock">
                                    My Voted Tokens:
                                </div>
                            </th>
                            <td className="account-balance__value">100 GLF</td>
                            <td></td>
                        </tr>
                        <tr>
                            <th className="account-balance__title">
                                <div className="account-balance__unlock">
                                    My Tokens ready to unlock:
                                </div>
                            </th>
                            <td className="account-balance__value">0 GLF</td>
                            <td className="account-balance__btn">
                                <button
                                    className="btn btn--border btn--small"
                                    type="button"
                                    onClick={() => setUnlockedOpen(true)}
                                >
                                    Unlock tokens
                                </button>
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
                            <td className="account-balance__value">121 GLF</td>
                            <td></td>
                        </tr>
                        <tr>
                            <th className="account-balance__title">
                                My rewards for Stage 2:
                            </th>
                            <td className="account-balance__value">122 GLF</td>
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
                            <td className="account-balance__value">243 GLF</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

                <button
                    className="btn account-balance__submit"
                    onClick={() => setClaimOpen(true)}
                >
                    Claim reward
                </button>
            </div>

            {claimOpen && (
                <div className="modal-show">
                    <div className="wrapper">
                        <ClaimedTokensModal setClaimOpen={setClaimOpen} />
                    </div>
                </div>
            )}
            {unlockedOpen && (
                <div className="modal-show">
                    <div className="wrapper">
                        <UnlockedTokensModal setUnlockedOpen={setUnlockedOpen} />
                    </div>
                </div>
            )}
        </div>
    );
};
