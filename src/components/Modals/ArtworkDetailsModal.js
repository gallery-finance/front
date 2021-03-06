import React from "react";

import starryNight1x from "../../assets/img/artwork-list/starry-night.webp";
import starryNight2x from "../../assets/img/artwork-list/starry-night@2x.webp";
import starryNightJPG1x from "../../assets/img/artwork-list/starry-night.jpg";
import starryNightJPG2x from "../../assets/img/artwork-list/starry-night@2x.jpg";

export const ArtworkDetailsModal = ({ item, setIsOpen }) => (
    <div className="modal">
        <div className="modal__box">
            <div className="modal__item modal__item--artwork-details">
                <form
                    className="form-vote-new form-app"
                    action="/"
                    noValidate="novalidate"
                >
                    <h3 className="modal__title h3">Artwork Details</h3>
                    <div className="form-vote-new__img">
                        <picture>
                            <source
                                srcSet={`${starryNight1x} 1x, ${starryNight2x} 2x`}
                                type="image/webp"
                            />
                            <source
                                srcSet={`${starryNightJPG1x} 1x, ${starryNightJPG2x} 2x`}
                            />
                            <img
                                src={starryNightJPG2x}
                                alt="Starry Night"
                                loading="lazy"
                                width="180"
                                height="115"
                            />
                        </picture>
                    </div>
                    <table className="form-vote__table">
                        <tbody>
                            <tr>
                                <th>Figure:</th>
                                <td>Donald Trump</td>
                            </tr>

                            <tr>
                                <th>Name:</th>
                                <td>{item.title}</td>
                            </tr>

                            <tr>
                                <th>Artist:</th>
                                <td>Van Gogh</td>
                            </tr>

                            <tr>
                                <th>Details:</th>
                                <td>
                                    Amet minim mollit non deserunt ullamco est sit
                                    aliqua dolor do amet sint. Velit officia
                                    consequat duis enim velit mollit. Exercitation
                                    veniam consequat sunt nostrud amet.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="form-app__submit">
                        <button
                            className="btn btn--outline btn--medium modal__close"
                            type="button"
                            onClick={() => setIsOpen(false)}
                        >
                            OK
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
);
