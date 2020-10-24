import React from "react";

export const AuctionDetailsModal = ({ item, setIsOpen }) => {
    const userPurchasedItem = false;
    const auctionIsFinished = false;

    const purchaseIsSuccess = true;

    const getUserBidInfo = () => {
        return (
            <>
                <hr />
                <table className="form-vote__table auction-details__bid">
                    <tbody>
                        <tr>
                            <th>Time left:</th>
                            <td>2d : 15h : 45m</td>
                        </tr>
                        <tr>
                            <th>Current auction price:</th>
                            <td>2.22121 GLF</td>
                        </tr>
                        <tr>
                            <th>Your current bid amount:</th>
                            <td>1.1112 GLF</td>
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
            </>
        );
    };

    const getPurchaseStatus = () => {
        return (
            <>
                <hr />
                <table className="form-vote__table auction-details__bid">
                    <tbody>
                        <tr>
                            <th>The auction is closed:</th>
                            <td>0d : 0h : 0m</td>
                        </tr>
                        <tr>
                            <th>Current auction price:</th>
                            <td>2.22121 GLF</td>
                        </tr>
                        <tr>
                            <th>Your current bid amount:</th>
                            <td>1.1112 GLF</td>
                        </tr>
                    </tbody>
                </table>
                <hr />
                {purchaseIsSuccess ? (
                    <p className="auction-details__result result--green">You have successfully purchased the item</p>
                ) : (
                    <p className="auction-details__result result--red">Sorry, you have not purchased the item</p>
                )}
                <div className="form-app__submit">
                    <button
                        className="btn btn--medium modal__close"
                        type="button"
                        onClick={() => setIsOpen(false)}
                    >
                        {purchaseIsSuccess ? "Claim my NFT" : "Claim my GLFs"}
                    </button>
                </div>
            </>
        );
    };

    const getFormForPurchase = () => {
        return (
            <>
                <hr />
                <table className="form-vote__table auction-details__bid">
                    <tbody>
                        <tr>
                            <th>Time left:</th>
                            <td>2d : 15h : 45m</td>
                        </tr>
                        <tr>
                            <th>Current auction price:</th>
                            <td>2.22121 GLF</td>
                        </tr>
                    </tbody>
                </table>
                <hr />
                <div className="auction__inputbox form-app__inputbox">
                    <p className="form-app__label align-center opacity-60">
                        Your Bid Amount
                    </p>
                    <div className="form-app__inputbox-control">
                        <div className="form-app__inputbox-input">
                            <input className="input" placeholder="0.0000" />
                        </div>
                        <div className="form-app__inputbox-up">
                            <div className="form-app__inputbox-up-pref">Max</div>
                        </div>
                    </div>
                </div>
                <p className="form-app__inputbox-after-text">
                    Balance: 110.212121 GLF tokens
                    <br />
                </p>
                <div className="form-app__submit form-app__submit--row">
                    <button
                        className="btn btn--outline btn--medium"
                        type="button"
                        onClick={() => setIsOpen(false)}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="btn btn--medium"
                        onClick={() => setIsOpen(false)}
                    >
                        Confirm
                    </button>
                </div>
            </>
        );
    };

    return (
        <div className="modal">
            <div className="modal__box">
                <div className="modal__item">
                    <form
                        className="form-vote-new form-app"
                        action="/"
                        noValidate="novalidate"
                    >
                        <div className="auction-details__title">
                            <h3 className="modal__title h3">Auction Details</h3>
                            <div
                                className={`auction-details__type auction-details__type--${item.type}`}
                            >
                                {item.type}
                            </div>
                        </div>
                        <div className="auction-details__image-wrapper">
                            <div className="form-vote-new__img auction-details__image">
                                <picture>
                                    <img
                                        src={item.cover}
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
                                    <td>{item.label}</td>
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
                                    <td>{item.id}</td>
                                </tr>
                                <tr>
                                    <th>Contract address:</th>
                                    <td className="table__token">
                                        <a href="/">{item.token}</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {item.type === "live" ? (
                            userPurchasedItem ? (
                                getUserBidInfo()
                            ) : auctionIsFinished ? (
                                getPurchaseStatus()
                            ) : (
                                getFormForPurchase()
                            )
                        ) : (
                            <div className="form-app__submit">
                                <button
                                    className="btn btn--outline btn--medium modal__close"
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                >
                                    OK
                                </button>
                            </div>
                        )}
                        <button
                            type="button"
                            className="modal__close modal__close-btn button"
                            aria-label="Close modal"
                            onClick={() => setIsOpen(false)}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <path d="M14.5 10l7.39-7L24 5l-7.39 7L24 19l-2.11 2-7.39-7-7.39 7L5 19l7.39-7L5 5l2.11-2 7.39 7z" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
