import React from "react";

import cover from "../../../assets/img/card-pool/6.png";
import {formatAmount} from "../../../utils/format";

export const CheckPoolStatus = ({pool}) => {
    const statusExists = true;
    const statusIsOk = true;

    const getPoolStatus = () => {
        return (
            <>
                <hr />
                <table className="form-vote__table auction-details__table">
                    <tbody>
                        <tr>
                            <th>The auction is closed:</th>
                            <td>0d : 0h : 0m </td>
                        </tr>
                    </tbody>
                </table>
                <hr />

                {statusIsOk ? (
                    <p className="auction-details__result result--green">
                        Your item was successfully sold at the auction
                    </p>
                ) : (
                    <p className="auction-details__result result--red">
                        Sorry, your item was not sold at the auction
                    </p>
                )}

                <div className="form-app__submit">
                    <button className="btn btn--medium check-pool-btn" type="button">
                        {statusIsOk ? "Claim my GLFs" : "Claim my NFT"}
                    </button>
                </div>
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
                            <td>2d : 15h : 45m</td>
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
                                        src={cover}
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
                                        <span className="opacity-60">
                                            by Van Gogh
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Details:</th>
                                    <td>
                                        Amet minim mollit non deserunt ullamco est
                                        sit aliqua dolor do amet sint. Velit officia
                                        consequat duis enim velit mollit.
                                        Exercitation veniam consequat sunt nostrud
                                        amet.
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
                                            0x84e517408ba6b891b9ac74b2f90013fcbc516d9d
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {statusExists ? getPoolStatus() : getTimeInfo()}
                    </form>
                </div>
            </div>
        </div>
    );
};
