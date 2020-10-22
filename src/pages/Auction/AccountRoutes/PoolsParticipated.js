import React from "react";

import { AuctionCard } from "../../../components/Auction";

import cover_1 from "../../../assets/img/card-pool/1.png";
import cover_2 from "../../../assets/img/card-pool/2.png";
import cover_3 from "../../../assets/img/card-pool/3.png";

const auctionList = [
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
    }
];

export const PoolsParticipated = () => {
    return (
        <div className="tabs__item">
            <div className="auction-list">
                <div className="auction-list__list">
                    {auctionList.map(item => (
                        <AuctionCard key={item.title} item={item} isNFT />
                    ))}
                </div>
            </div>
        </div>
    );
};
