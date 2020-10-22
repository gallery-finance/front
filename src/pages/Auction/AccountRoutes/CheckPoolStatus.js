import React from "react";

import cover from "../../../assets/img/card-pool/6.png";

export const CheckPoolStatus = () => {
    return (
        <div className="auction-my-pool auction-my-pool--check">
            <div className="modal__box">
                <div className="modal__item">
                    <form
                        className="form-vote-new form-app"
                        action="/"
                        noValidate="novalidate"
                    >
                        <h3 className="modal__title h3">Create a new NFT auction</h3>
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
                                    <h4>1 GLF = 0.001 ETH</h4>
                                </div>
                                <div>
                                    <p>Minimal bid price increment:</p>
                                    <h4>1 GLF = 0.0356 ETH</h4>
                                </div>
                            </div>
                        </div>
                        <table className="form-vote__table auction-details__table">
                            <tbody>
                                <tr>
                                    <th>Name:</th>
                                    <td>
                                        Starry Night{" "}
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
                                    <td>13 of Workshop #1</td>
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

                        <hr />
                        <table className="form-vote__table auction-details__table">
                            <tbody>
                                <tr>
                                    <th>Time left:</th>
                                    <td>2d : 15h : 45m</td>
                                </tr>
                            </tbody>
                        </table>
                        <hr />

                        <div className="auction-my-pool__bids">
                            <h3 className="auction-my-pool__bids__title">
                                Current bids
                            </h3>
                            <table className="auction-my-pool__bids__table">
                                <tbody>
                                    <tr>
                                        <td>11:23:06</td>
                                        <td className="opacity-40">15/12/2020</td>
                                        <td>128.074 GLF</td>
                                        <td>
                                            <a href="/">
                                                0x87674F69E29A2....2d1D3593CF7
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>23:50:21</td>
                                        <td className="opacity-40">11/12/2020</td>
                                        <td>120.111 GLF</td>
                                        <td>
                                            <a href="/">
                                                0x76474F69E29A2....2d1D3593LFE3
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>07:32:18</td>
                                        <td className="opacity-40">8/12/2020</td>
                                        <td>120.507 GLF</td>
                                        <td>
                                            <a href="/">
                                                0x76474F69E29A2....2d1D359PFH4
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>15:48:29</td>
                                        <td className="opacity-40">3/12/2020</td>
                                        <td>109.873 GLF</td>
                                        <td>
                                            <a href="/">
                                                0x76474F69E29A2....2d1D3590DKJ
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="form-app__submit">
                            <button
                                className="btn btn--outline btn--medium"
                                type="button"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
