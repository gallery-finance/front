import React from "react";

import cover_1 from "../../../assets/img/card-pool/1.png";
import cover_2 from "../../../assets/img/card-pool/2.png";
import cover_3 from "../../../assets/img/card-pool/3.png";

import { PurchasedCard } from "../../../components/Auction";

const purchasedList = [
    {
        id: "13",
        tokenID: "1",
        label: "Starry Night",
        cover: cover_1,
        token: "0x84e517408ba6b891b9ac74b2f90013fcbc516d9d"
    },
    {
        id: "13",
        tokenID: "1",
        label: "Portrait of the Postman Joseph...",
        cover: cover_2,
        token: "0x84e517408ba6b891b9ac74b2f90013fcbc516d9d"
    },
    {
        id: "13",
        tokenID: "1",
        label: "Wheatfield with Crows",
        cover: cover_3,
        token: "0x84e517408ba6b891b9ac74b2f90013fcbc516d9d"
    }
];

export const PurchasedNFTs = () => {
    return (
        <div className="tabs__item">
            <div className="auction-list">
                <div className="auction-list__list">
                    {purchasedList.map(item => (
                        <PurchasedCard key={item.label} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};
