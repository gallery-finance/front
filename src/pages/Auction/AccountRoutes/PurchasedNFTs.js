import React from "react";

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

import { ArtworkCard } from "../../../components/account";

const purchasedList = [
    {
        title: "The Starry Night",
        imgBig: starryNightBig,
        img1: starryNight1x,
        img2: starryNight2x,
        img3: starryNightJPG1x,
        img4: starryNightJPG2x,
        text:
            "The Starry Night is an oil on canvas painting by Dutch Post-Impressionist painter Vincent van Gogh. Painted in June 1889, it depicts the view from the east-facing window of his"
    },
    {
        title: "Portrait of the ... ",
        imgBig: portraitBig,
        img1: portrait1x,
        img2: portrait2x,
        img3: portraitJPG1x,
        img4: portraitJPG2x,
        text:
            "Joseph Roulin—who appears in this portrait resplendent in his blue uniform against a floral background that echoes his lush, swirling beard—was among Vincent"
    },
    {
        title: "Wheatfield with ... ",
        imgBig: wheatfieldBig,
        img1: wheatfield1x,
        img2: wheatfield2x,
        img3: wheatfieldJPG1x,
        img4: wheatfieldJPG2x,
        text:
            "Wheatfield with Crows is a July 1890 painting by Vincent van Gogh. It has been cited by several critics as one of his greatest works. It is commonly stated that this was van Gogh's"
    }
];

export const PurchasedNFTs = () => {
    return (
        <div className="tabs__item">
            <div className="auction-list">
                <div className="auction-list__list">
                    {purchasedList.map(item => (
                        <ArtworkCard key={item.title} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};
