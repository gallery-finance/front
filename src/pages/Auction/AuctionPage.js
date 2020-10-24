import React from "react";
import { Link } from "react-router-dom";

import { AuctionCard } from "../../components/Auction";
import { BackButton } from "../../components/BackButton";
import { SearchIcon } from "../../icons";

import cover_1 from "../../assets/img/card-pool/1.png";
import cover_2 from "../../assets/img/card-pool/2.png";
import cover_3 from "../../assets/img/card-pool/3.png";
import cover_4 from "../../assets/img/card-pool/4.png";
import cover_5 from "../../assets/img/card-pool/5.png";
import cover_6 from "../../assets/img/card-pool/6.png";

const poolList = [
    {
        id: "13",
        type: "live",
        label: "Starry Night",
        author: "by Van Gogh",
        cover: cover_1,
        token: "0x84e517408ba6b891b9ac74b2f90013fcbc516d9d"
    },
    {
        id: "13",
        type: "closed",
        label: "Portrait of the ... ",
        author: "by Van Gogh",
        cover: cover_2,
        token: "0x84e517408ba6b891b9ac74b2f90013fcbc516d9d"
    },
    {
        id: "13",
        type: "filled",
        label: "Wheatfield with ... ",
        author: "by Van Gogh",
        cover: cover_3,
        token: "0x84e517408ba6b891b9ac74b2f90013fcbc516d9d"
    },
    {
        id: "13",
        type: "closed",
        label: "Portrait of the ... ",
        author: "by Van Gogh",
        cover: cover_4,
        token: "0x84e517408ba6b891b9ac74b2f90013fcbc516d9d"
    },
    {
        id: "13",
        type: "live",
        label: "Starry Night",
        author: "by Van Gogh",
        cover: cover_5,
        token: "0x84e517408ba6b891b9ac74b2f90013fcbc516d9d"
    },
    {
        id: "13",
        type: "filled",
        label: "Wheatfield with ... ",
        author: "by Van Gogh",
        cover: cover_6,
        token: "0x84e517408ba6b891b9ac74b2f90013fcbc516d9d"
    }
];

export const AuctionPage = () => (
    <article className="center">
        <BackButton toHome />

        <header className="head-page">
            <h1 className="head-page__title h1">Decentralized NFT Auction</h1>
        </header>

        <div className="voter-head">
            <div className="voter-head__dashboard">
                <div className="voter-head__dashboard-account">
                    <div className="voter-head__dashboard-ico">
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path d="M2 9h19a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V9zm1-6h15v4H2V4a1 1 0 011-1zm12 11v2h3v-2h-3z"></path>
                        </svg>
                    </div>
                    <Link to="/auction/account" className="link">
                        Account
                    </Link>
                </div>
                <div className="voter-head__dashboard-power">
                    <p>
                        Your Voting Power: <b>100 GLF</b>
                    </p>
                </div>
                <div className="voter-head__dashboard-btn">
                    <div className="auction-header__input">
                        <input type="text" placeholder="Search auction..." />
                        <button className="auction-header__input-icon">
                            <SearchIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div className="auction-list">
            <div className="auction-list__list">
                {poolList.map(item => (
                    <AuctionCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    </article>
);
