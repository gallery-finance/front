import React, {useState} from "react";
import { Grow } from "@material-ui/core";

import { GalleryModal, AuctionDetailsModal } from "../Modals";

export const AuctionCard = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [galleryOpen, setGalleryOpen] = useState(false);

    return (
        <>
            <Grow in={true} timeout={1500}>
                <div className="auction-list__item">
                    <a onClick={() => setGalleryOpen(true)} className="item__img">
                        <picture>
                            <img
                                src={item.image}
                                alt="`$`"
                                loading="lazy"
                                width="264"
                                height="170"
                            />
                        </picture>
                    </a>
                    <h2 className="item__title h3">{item.name}</h2>
                    <button
                        className={`item__type item__type--${item.status}`}
                        onClick={() => setIsOpen(true)}
                    >
                        {item.status}
                    </button>
                    <h5 className="item__workshop">
                        Token ID {item.tokenId}
                    </h5>
                    {/*<div className="item__token">*/}
                    {/*    <p className="item__token-title">Token contract address</p>*/}
                    {/*    <a href="/" className="item__token-address">*/}
                    {/*        {item.token}*/}
                    {/*    </a>*/}
                    {/*</div>*/}
                </div>
            </Grow>

            {galleryOpen && (
                <div className="modal-show">
                    <div className="wrapper">
                        <GalleryModal
                            imgBig={item.image}
                            setIsOpen={setGalleryOpen}
                        />
                    </div>
                </div>
            )}

            {isOpen && (
                <div className="modal-show">
                    <div className="wrapper">
                        <AuctionDetailsModal item={item} setIsOpen={setIsOpen} />
                    </div>
                </div>
            )}
        </>
    );
};
