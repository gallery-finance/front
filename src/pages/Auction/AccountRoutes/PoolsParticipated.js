import React from "react";
import { AuctionCard } from "../../../components/Auction";
import {useMyBiddenPool} from "../Hooks";

export const PoolsParticipated = () => {

    const {myBiddenPool} = useMyBiddenPool()

    return (
        <div className="tabs__item">
            <div className="auction-list">
                <div className="auction-list__list">
                    {myBiddenPool.map(item => (
                        <AuctionCard key={item.title} item={item} isNFT />
                    ))}
                </div>
            </div>
        </div>
    );
};
