import React, { useState } from "react";

import { EyeOpenIcon, EyeCloseIcon } from "../../../icons";
import cover from "../../../assets/img/card-pool/6.png";

export const CreatePool = () => {
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [checked, setChecked] = useState(false);

    return (
        <div className="auction-my-pool">
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
                            <div className="auction-my-pool__data">
                                <div>
                                    <p>Name of Auction:</p>
                                    <div className="form-app__inputbox-input">
                                        <input
                                            className="input input--sm"
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className="auction-my-pool__data-password">
                                    <div>
                                        <p>Password:</p>
                                        <div className="form-app__inputbox-input">
                                            <input
                                                className="input input--sm"
                                                type={
                                                    showPassword1
                                                        ? "text"
                                                        : "password"
                                                }
                                            />
                                            {showPassword1 ? (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowPassword1(false)
                                                    }
                                                >
                                                    <EyeOpenIcon />
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowPassword1(true)
                                                    }
                                                >
                                                    <EyeCloseIcon />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <p>Confirm Password:</p>
                                        <div className="form-app__inputbox-input">
                                            <input
                                                className="input input--sm"
                                                type={
                                                    showPassword2
                                                        ? "text"
                                                        : "password"
                                                }
                                            />
                                            {showPassword2 ? (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowPassword2(false)
                                                    }
                                                >
                                                    <EyeOpenIcon />
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowPassword2(true)
                                                    }
                                                >
                                                    <EyeCloseIcon />
                                                </button>
                                            )}
                                        </div>
                                    </div>
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
                        <div className="auction-my-pool__price">
                            <div className="auction-my-pool__price-row">
                                <p>Starting price (Floor price):</p>
                                <div className="auction-my-pool__price-input">
                                    <div className="form-app__inputbox-input">
                                        <input
                                            className="input input--sm"
                                            placeholder="0,00"
                                            type="text"
                                        />
                                    </div>
                                    GLF
                                </div>
                            </div>
                            <div className="auction-my-pool__price-row">
                                <label className="checkbox">
                                    <input
                                        checked={checked}
                                        onChange={() => {
                                            setChecked(prev => !prev);
                                        }}
                                        type="checkbox"
                                        className="checkbox__input visuallyhidden"
                                        required="required"
                                    />
                                    <span className="checkbox__label">
                                        Min bid price increment:
                                    </span>
                                </label>
                                <div className="auction-my-pool__price-input">
                                    <div className="form-app__inputbox-input">
                                        <input
                                            className="input input--sm"
                                            placeholder="0,00"
                                            type="text"
                                            disabled={!checked}
                                        />
                                    </div>
                                    GLF
                                </div>
                            </div>
                        </div>
                        <hr />

                        <div className="form-app__inputbox auction-my-pool__time">
                            <p className="auction-my-pool__time-title">
                                Pool running time:
                            </p>
                            <div className="form-app__inputbox-row">
                                <div>
                                    <p>Days</p>
                                    <div className="form-app__inputbox-input">
                                        <input
                                            className="input input--sm"
                                            type="number"
                                            min={0}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p>Hours</p>
                                    <div className="form-app__inputbox-input">
                                        <input
                                            className="input input--sm"
                                            type="number"
                                            min={0}
                                            max={23}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p>Minutes</p>
                                    <div className="form-app__inputbox-input">
                                        <input
                                            className="input input--sm"
                                            type="number"
                                            min={0}
                                            max={59}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-app__submit form-app__submit--row">
                            <button
                                className="btn btn--outline btn--medium"
                                type="button"
                            >
                                Cancel
                            </button>
                            <button type="button" className="btn btn--medium">
                                Launch
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
