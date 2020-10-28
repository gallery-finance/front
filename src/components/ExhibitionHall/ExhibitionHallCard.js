import React, { useState } from "react";

import { GalleryModal } from "../Modals";

export const ExhibitionHallCard = ({ item }) => {
    const [galleryOpen, setGalleryOpen] = useState(false);

    return (
        <>
            <div className="exhibition-hall-list__item item">
                <a onClick={() => setGalleryOpen(true)} className="item__image">
                    <img src={item.image} alt="`$`" width="348" height="348" />
                </a>
                <div className="item__content">
                    <h4 className="item__title h4">{item.title}</h4>
                    <p className="item__author">{item.author}</p>
                    <p className="item__hashtags">{item.hashtags}</p>
                    <p className="item__date">{item.date}</p>
                </div>
            </div>

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
        </>
    );
};
