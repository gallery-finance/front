import React, { useState } from "react";

import { BackButton } from "../../components/BackButton";
import { AvailabelArtworksCard } from "../../components/pool/AvailabelArtworksCard";

import {useNFTList} from "../Auction/Hooks";
import {useProposals} from "../Workshop/Hooks";
import {Link} from "react-router-dom";
import {formatAmount} from "../../utils/format";
import {useBalance} from "../Hooks";
import {getPointAddress} from "../../web3/address";
import {useActiveWeb3React} from "../../web3";

export const AvailableArtworks = () => {
    const {chainId} = useActiveWeb3React()
    const [selectedType, setSelectedType] = useState(-1);

    const {nftList} = useNFTList()
    const {proposals} = useProposals()
    const {balance} = useBalance(getPointAddress(chainId))


    const handleSelectHashtag = hashtagName => {
        console.log('handleSelectHashtag',hashtagName)
        setSelectedType(hashtagName);
        // fetch items ...
    };

    return (
        <article className="available-artworks center">
            <BackButton toPools />

            <h1 class="available-artworks__title h1">Available Artworks</h1>

          <div className="voter-head__dashboard">
            <div className="voter-head__dashboard-account">
              <div className="voter-head__dashboard-ico">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                      d="M2 9h19a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V9zm1-6h15v4H2V4a1 1 0 011-1zm12 11v2h3v-2h-3z"/>
                </svg>
              </div>
              <Link to="/workshop/account" className="link line">
                Account
              </Link>
            </div>
            <div className="voter-head__dashboard-power">
              <p>
                Your Reward Points: <b>{balance && formatAmount(balance)} GP</b>
              </p>
            </div>
            {/*<div className="voter-head__dashboard-btn" >*/}
            {/*  <button*/}
            {/*      disabled*/}
            {/*      style={{ backgroundColor: "#4a4a4a" }}*/}
            {/*      type="button"*/}
            {/*      className="btn"*/}
            {/*       onClick={() => setIsOpen(true)}*/}
            {/*  >*/}
            {/*    Propose a figure*/}
            {/*  </button>*/}
            {/*</div>*/}
          </div>

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
                {nftList.filter(item => {return (selectedType === -1 || selectedType === item.proposalId)}).map(item => (
                    <AvailabelArtworksCard key={item.id} item={item} />
                ))}
            </div>
        </article>
    );
};
