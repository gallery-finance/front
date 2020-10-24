import React, { useState } from "react";

import {GalleryModal, VoteModal} from "../Modals";

import bigImg from "../../assets/img/artwork-list/big.jpg";
import imgWebp1x from "../../assets/img/artwork-list/img.webp";
import imgWebp2x from "../../assets/img/artwork-list/img@2x.webp";
import img1x from "../../assets/img/artwork-list/img.jpg";
import img2x from "../../assets/img/artwork-list/img@2x.jpg";
import {useGLFBalance} from "../../pages/Hooks";
import {formatAmount} from "../../utils/format";

export const VoteCard = ({ setIsOpen, figure }) => {
    const {glfBalance} = useGLFBalance()
    console.log('vate card',figure)
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [voting, setVoting] = useState(false);

    return (
        <>
            <div className="artwork-list__item">
                <a
                    onClick={() => setGalleryOpen(true)}
                    className="artwork-list__img modal-gallery"
                >
                    <picture>

                        <img
                            src={figure.info.image}
                            alt="Starry Night"
                            loading="lazy"
                            width="264"
                            height="170"
                        />
                    </picture>
                </a>

                <h2 className="artwork-list__title h3">{figure.info.title}</h2>

                <p className="artwork-list__author">by {figure.info.name}</p>

                <div className="artwork-list__hashtag">
                    <a href="/">#vangogh</a>
                </div>

                <button
                    type="button"
                    className="artwork-list__btn btn"
                    onClick={() => setVoting(true)}
                >
                    Vote
                </button>

                <p className="artwork-list__desc">
                    {figure.info.description}
                </p>

                <hr />

                <div className="artwork-list__votes">{formatAmount(figure.votes)} GLF Votes</div>
            </div>

            {galleryOpen && (
                <div className="modal-show">
                    <div className="wrapper">
                        <GalleryModal imgBig={figure.info.image} setIsOpen={setGalleryOpen} />
                    </div>
                </div>
            )}

            {voting && (
                <div className="modal-show">
                    <div className="wrapper">
                        <VoteModal figure={figure}  setIsOpen={setVoting} />
                    </div>
                </div>
            )}
        </>
    );
};
