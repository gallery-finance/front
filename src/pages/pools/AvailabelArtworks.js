import React, { useState } from "react";

import { BackButton } from "../../components/BackButton";
import { AvailabelArtworksCard } from "../../components/pool/AvailabelArtworksCard";

import image1 from '../../assets/img/card-pool/5.png'
import image2 from '../../assets/img/card-pool/6.png'
import image3 from '../../assets/img/card-pool/4.png'

const hashtagsList = [
    "Donald Jay Trump Junior",
    "Donald Jay Trump Junior",
    "Donald Jay Trump Junior",
    "Donald Jay Trump Junior",
    "Donald Jay Trump Junior",
    "Donald Jay Trump Junior",
    "Donald Jay Trump Junior",
    "Donald Jay Trump Junior",
    "Donald Jay Trump Junior",
    "Donald Jay Trump Junior"
];

const list = [
    {
        id: "123",
        image: image1,
        title: "The Starry Night",
        author: "Van Gogh",
        hashtag: "vangogh",
        tokenID: "11",
        address: "0x84e517408ba6b891b9ac74b2f90013fcbc516d9d",
        redeemed: "2",
        left: "2",
        points: "202",
        description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
    },
    {
        id: "1233",
        image: image2,
        title: "The Starry Night",
        author: "Van Gogh",
        hashtag: "vangogh",
        tokenID: "11",
        address: "0x84e517408ba6b891b9ac74b2f90013fcbc516d9d",
        redeemed: "2",
        left: "2",
        points: "202",
        description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
    },
    {
        id: "1234",
        image: image3,
        title: "The Starry Night",
        author: "Van Gogh",
        hashtag: "vangogh",
        tokenID: "11",
        address: "0x84e517408ba6b891b9ac74b2f90013fcbc516d9d",
        redeemed: "2",
        left: "2",
        points: "202",
        description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
    }
];

export const AvailabelArtworks = () => {
    const [selectedType, setSelectedType] = useState(-1);

    const handleSelectHashtag = hashtagName => {
        setSelectedType(hashtagName);
        // fetch items ...
    };

    return (
        <article className="available-artworks center">
            <BackButton toPools />

            <h1 class="available-artworks__title h1">Available Artworks</h1>

            <div className="hashtag">
                <div className="hashtag__list" style={{ justifyContent: "center" }}>
                    <label className="hashtag__item">
                        <input
                            checked={selectedType === -1}
                            onChange={() => {
                                handleSelectHashtag(-1);
                            }}
                            name="art-type"
                            type="radio"
                            className="hashtag__input visuallyhidden"
                        />
                        <span className="hashtag__label">#All</span>
                    </label>

                    {hashtagsList.map((hashtag, i) => (
                        <label key={i} className="hashtag__item">
                            <input
                                checked={hashtag === selectedType}
                                onChange={() => {
                                    handleSelectHashtag(hashtag);
                                }}
                                name="art-type"
                                type="radio"
                                className="hashtag__input visuallyhidden"
                            />
                            <span className="hashtag__label">#{hashtag}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="available-artworks-list">
                {list.map(item => (
                    <AvailabelArtworksCard key={item.id} item={item} />
                ))}
            </div>
        </article>
    );
};
