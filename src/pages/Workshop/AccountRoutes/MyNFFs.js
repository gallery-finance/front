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
import {useNFTList} from "../../Auction/Hooks";
import {useActiveWeb3React} from "../../../web3";

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

export const MyNFTs = () => {
    const {account} = useActiveWeb3React()
    const {nftList} = useNFTList()
    console.log('my nft',nftList)
    return (
        <div className="tabs__item">
            <div className="artwork-list">
                <div className="artwork-list__list">
                    {nftList.filter(item => {return item.owner.toLowerCase() === account.toLowerCase()}).map(item => (
                        <ArtworkCard key={item.title} figure={item} isNFT />
                    ))}
                </div>
            </div>
        </div>
    );
};
