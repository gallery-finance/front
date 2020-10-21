import React, { useState } from "react";
import { Grow } from "@material-ui/core";

import { GalleryModal, ArtworkDetailsModal } from "../Modals";

export const ArtworkCard = ({ item, isNFT }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [galleryOpen, setGalleryOpen] = useState(false);

    return (
        <>
            <Grow in={true} timeout={1500}>
                {isNFT ? (
                    <div className="artwork-list__item">
                        <a
                            onClick={() => setGalleryOpen(true)}
                            className="artwork-list__img modal-gallery"
                        >
                            <picture>
                                <source
                                    srcSet={`${item.img1} 1x, ${item.img2} 2x`}
                                    type="image/webp"
                                />
                                <source
                                    srcSet={`${item.img3} 1x, ${item.img4} 2x`}
                                />
                                <img
                                    src={item.img4}
                                    alt={item.title}
                                    loading="lazy"
                                    width="264"
                                    height="170"
                                />
                            </picture>
                            <span className="artwork-list__badge">
                                <b
                                    className={`artwork-list__badge-inner ${
                                        item.number === 2 &&
                                        "artwork-list__badge-inner2"
                                    } ${
                                        item.number === 3 &&
                                        "artwork-list__badge-inner3"
                                    }`}
                                >
                                    {item.number}
                                </b>
                            </span>
                        </a>
                        <h2 className="artwork-list__title h3">{item.title}</h2>
                        <p className="artwork-list__author">by Van Gogh</p>
                        <div className="artwork-list__hashtag">
                            <p>#vangogh</p>
                        </div>
                        <button
                            type="button"
                            className="artwork-list__btn btn btn--gray"
                            onClick={() => setIsOpen(true)}
                        >
                            Redeemed Jan 15, 2020
                        </button>
                        <p className="artwork-list__token-id">
                            Token ID {item.tokenID} of Workshop #1
                        </p>
                        <p className="artwork-list__token-address">
                            Token contract address
                        </p>
                        <p className="artwork-list__token-hash">
                            <a href="/">
                                0x84e517408ba6b891b9ac74b2f90013fcbc516d9d
                            </a>
                        </p>
                        <hr />
                        <div className="artwork-list__votes">
                            200.10 Reward points
                        </div>
                    </div>
                ) : (
                    <div className="artwork-list__item">
                        <a
                            onClick={() => setGalleryOpen(true)}
                            className="artwork-list__img modal-gallery"
                        >
                            <picture>
                                <source
                                    srcSet={`${item.img1} 1x, ${item.img2} 2x`}
                                    type="image/webp"
                                />
                                <source
                                    srcSet={`${item.img3} 1x, ${item.img4} 2x`}
                                />
                                <img
                                    src={item.img4}
                                    alt={item.title}
                                    loading="lazy"
                                    width="264"
                                    height="170"
                                />
                            </picture>
                        </a>
                        <h2 className="artwork-list__title h3">{item.title}</h2>
                        <p className="artwork-list__author">by Van Gogh</p>
                        <button
                            type="button"
                            className="artwork-list__btn btn btn--gray"
                            onClick={() => setIsOpen(true)}
                        >
                            Proposed Jan 2, 2020
                        </button>
                        <p className="artwork-list__desc">{item.text}</p>
                        <hr />
                        <div className="artwork-list__votes">10,100.2 GLF Votes</div>
                    </div>
                )}
            </Grow>

            {galleryOpen && (
                <div className="modal-show">
                    <div className="wrapper">
                        <GalleryModal
                            imgBig={item.imgBig}
                            setIsOpen={setGalleryOpen}
                        />
                    </div>
                </div>
            )}

            {isOpen && (
                <div className="modal-show">
                    <div className="wrapper">
                        <ArtworkDetailsModal item={item} setIsOpen={setIsOpen} />
                    </div>
                </div>
            )}
        </>
    );
};
