import React, { useState } from "react";

import { BackButton } from "../../components/BackButton";
import { AvailabelArtworksCard } from "../../components/pool/AvailabelArtworksCard";

import {useNFTList} from "../Auction/Hooks";
import {useProposals} from "../Workshop/Hooks";

export const AvailableArtworks = () => {
    const [selectedType, setSelectedType] = useState(-1);

    const {nftList} = useNFTList()
    const {proposals} = useProposals()


    const handleSelectHashtag = hashtagName => {
        console.log('handleSelectHashtag',hashtagName)
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

                    {proposals.map((item, i) => (
                        <label key={i} className="hashtag__item">
                            <input
                                checked={item.id === selectedType}
                                onChange={() => {
                                    handleSelectHashtag(item.id);
                                }}
                                name="art-type"
                                type="radio"
                                className="hashtag__input visuallyhidden"
                            />
                            <span className="hashtag__label">#{item.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="available-artworks-list">
                {nftList.map(item => (
                    <AvailabelArtworksCard key={item.id} item={item} />
                ))}
            </div>
        </article>
    );
};
