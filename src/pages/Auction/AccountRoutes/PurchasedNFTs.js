import React from "react";


import { PurchasedCard } from "../../../components/Auction";
import {useMyBiddenPool} from "../Hooks";

export const PurchasedNFTs = () => {

    const {myBiddenPool} = useMyBiddenPool()

  console.log('my win pool', myBiddenPool.filter(item => {return item.status === 'closed' && item.isWin}))

    return (
        <div className="tabs__item">
            <div className="auction-list">
                <div className="auction-list__list">
                    {myBiddenPool.filter(item => {return ((item.status === 'closed') && item.isWin)}).map(item => (
                        <PurchasedCard key={item.label} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};
