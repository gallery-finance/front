import React, { useState } from "react";
import { Grow } from "@material-ui/core";

import { GalleryModal } from "../Modals";

export const AuctionCard = ({ id, type, label, author, cover, token }) => {
    const [galleryOpen, setGalleryOpen] = useState(false);

    return (
        <>
            <Grow in={true} timeout={1500}>
                <div className="auction-list__item">
                    <a onClick={() => setGalleryOpen(true)} className="item__img">
                        <picture>
                            <img
                                src={cover}
                                alt="`$`"
                                loading="lazy"
                                width="264"
                                height="170"
                            />
                        </picture>
                    </a>
                    <h2 className="item__title h3">{label}</h2>
                    <p className="item__author">{author}</p>
                    <button className={`item__type item__type--${type}`}>
                        {type}
                    </button>
                    <h5 className="item__workshop">Token ID {id} of Workshop #1</h5>
                    <div className="item__token">
                        <p className="item__token-title">Token contract address</p>
                        <a href="/" className="item__token-address">
                            {token}
                        </a>
                    </div>
                </div>
            </Grow>

            {galleryOpen && (
                <div className="modal-show">
                    <div className="wrapper">
                        <GalleryModal imgBig={cover} setIsOpen={setGalleryOpen} />
                    </div>
                </div>
            )}
        </>
    );
};
