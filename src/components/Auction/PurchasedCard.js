import React, { useState } from "react";
import { Grow } from "@material-ui/core";

import { GalleryModal, PurchasedDetailsModal } from "../Modals";

export const PurchasedCard = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [galleryOpen, setGalleryOpen] = useState(false);

    return (
        <>
            <Grow in={true} timeout={1500}>
                <div className="auction-list__item">
                    <a onClick={() => setGalleryOpen(true)} className="item__img">
                        <picture>
                            <img
                                src={item.cover}
                                alt={item.label}
                                loading="lazy"
                                width="264"
                                height="170"
                            />
                        </picture>
                    </a>
                    <h2 className="item__title h3">{item.label}</h2>
                    <button
                        type="button"
                        className="artwork-list__btn btn btn--gray"
                        onClick={() => setIsOpen(true)}
                    >
                        Purchased Jan 15, 2020
                    </button>
                    <p className="artwork-list__token-id">Token ID {item.tokenID}</p>
                    <p className="artwork-list__token-address">
                        Token contract address
                    </p>
                    <p className="artwork-list__token-hash">
                        <a href="/">{item.token}</a>
                    </p>
                    <hr className="item__line" />
                    <div className="item-purchased__price">220.30 GLF</div>
                </div>
            </Grow>

            {galleryOpen && (
                <div className="modal-show">
                    <div className="wrapper">
                        <GalleryModal
                            imgBig={item.cover}
                            setIsOpen={setGalleryOpen}
                        />
                    </div>
                </div>
            )}

            {isOpen && (
                <div className="modal-show">
                    <div className="wrapper">
                        <PurchasedDetailsModal item={item} setIsOpen={setIsOpen} />
                    </div>
                </div>
            )}
        </>
    );
};
