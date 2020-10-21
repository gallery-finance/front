import React, { useState } from "react";

import { ArtworkDetailsModal, GalleryModal } from "../../../components/Modals";

import starryNightBig from "../../../assets/img/artwork-list/starry-night--big.png";
import starryNight1x from "../../../assets/img/artwork-list/starry-night.webp";
import starryNight2x from "../../../assets/img/artwork-list/starry-night@2x.webp";
import starryNightJPG1x from "../../../assets/img/artwork-list/starry-night.jpg";
import starryNightJPG2x from "../../../assets/img/artwork-list/starry-night@2x.jpg";
import portraitBig from "../../../assets/img/artwork-list/portrait--big.png";
import portrait1x from "../../../assets/img/artwork-list/portrait.webp";
import portrait2x from "../../../assets/img/artwork-list/portrait@2x.webp";
import portraitJPG1x from "../../../assets/img/artwork-list/portrait.jpg";
import portraitJPG2x from "../../../assets/img/artwork-list/portrait@2x.jpg";
import wheatfieldBig from "../../../assets/img/artwork-list/wheatfield--big.png";
import wheatfield1x from "../../../assets/img/artwork-list/wheatfield.webp";
import wheatfield2x from "../../../assets/img/artwork-list/wheatfield@2x.webp";
import wheatfieldJPG1x from "../../../assets/img/artwork-list/wheatfield.jpg";
import wheatfieldJPG2x from "../../../assets/img/artwork-list/wheatfield@2x.jpg";

const artworks = [
    {
        title: "The Starry Night",
        imgBig: starryNightBig,
        img1: starryNight1x,
        img2: starryNight2x,
        img3: starryNightJPG1x,
        img4: starryNightJPG2x,
        tokenID: 11,
        number: 2
    },
    {
        title: "Portrait of the ... ",
        imgBig: portraitBig,
        img1: portrait1x,
        img2: portrait2x,
        img3: portraitJPG1x,
        img4: portraitJPG2x,
        tokenID: 12,
        number: 1
    },
    {
        title: "Wheatfield with ... ",
        imgBig: wheatfieldBig,
        img1: wheatfield1x,
        img2: wheatfield2x,
        img3: wheatfieldJPG1x,
        img4: wheatfieldJPG2x,
        tokenID: 13,
        number: 3
    }
];

export const MyNTFs = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [galleryOpen, setGelleryOpen] = useState(false);

    return (
        <div className="tabs__item">
            <div className="artwork-list">
                <div className="artwork-list__list">
                    {artworks.map(item => (
                        <React.Fragment key={item.tokenID}>
                            <div className="artwork-list__item">
                                <a
                                    onClick={() => setGelleryOpen(true)}
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

                                <h2 className="artwork-list__title h3">
                                    {item.title}
                                </h2>

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

                            {galleryOpen && (
                                <div className="modal-show">
                                    <div className="wrapper">
                                        <GalleryModal
                                            imgBig={item.imgBig}
                                            setIsOpen={setGelleryOpen}
                                        />
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {isOpen && (
                <div className="modal-show">
                    <div className="wrapper">
                        <ArtworkDetailsModal setIsOpen={setIsOpen} />
                    </div>
                </div>
            )}
        </div>
    );
};
