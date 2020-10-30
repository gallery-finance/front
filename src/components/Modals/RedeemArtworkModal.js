import React from "react";

import { CrossModalIcon } from "../../icons";

export const RedeemArtworkModal = ({ setIsOpen, figure }) => {
    return (
        <div className="modal">
            <div className="modal__box">
                <div className="modal__item modal__item--vote-img">
                    <form
                        className="form-vote-new form-app"
                        action="/"
                        noValidate="novalidate"
                    >
                        <h3 className="modal__title h3">Redeem an Artwork</h3>

                        <div className="form-vote-new__img">
                            <picture>
                                <img
                                    src={figure.image}
                                    alt=""
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
                                    <td>{figure.title}</td>
                                </tr>
                                <tr>
                                    <th>Details:</th>
                                    <td>{figure.description}</td>
                                </tr>
                            </tbody>
                        </table>

                        <p className="form-app__note">
                            <b>100</b> Reward Points will be spent to redeem this
                            artwork. You have <b>200</b> Reward Points now.
                        </p>

                        <div className="form-app__submit form-app__submit--row">
                            <button
                                className="btn btn--outline btn--medium modal__close"
                                type="button"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </button>
                            <button className="btn btn--medium" type="button">
                                Redeem
                            </button>
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
