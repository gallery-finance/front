import React, { useState } from "react";

import {
    CreatePool,
    CheckPoolStatus,
    PoolsParticipated,
    PurchasedNFTs
} from "./AccountRoutes";
import { BackButton } from "../../components/BackButton";
import {useMyPool} from "./Hooks";

export const AuctionAccountPage = () => {
    const userCreatedPool = false;
    const {myPool} = useMyPool()
    const [tab, setTab] = useState(1);

    return (
        <article className="center account">
            <BackButton toAuction />

            <h1 className="account__title h3">Account</h1>
            <div className="tabs">
                <div className="tabs__nav">
                    {!userCreatedPool ? (
                        <button
                            className={`tabs__btn button ${
                                tab === 1 && "is-active"
                            }`}
                            onClick={() => setTab(1)}
                        >
                            Create a pool
                        </button>
                    ) : (
                        <button
                            className={`tabs__btn button ${
                                tab === 2 && "is-active"
                            }`}
                            onClick={() => setTab(1)}
                        >
                            Check my pool status
                        </button>
                    )}

                    <button
                        className={`tabs__btn button ${tab === 3 && "is-active"}`}
                        onClick={() => setTab(3)}
                    >
                        Pools participated
                    </button>

                    <button
                        className={`tabs__btn button ${tab === 4 && "is-active"}`}
                        onClick={() => setTab(4)}
                    >
                        My NFTs
                    </button>
                </div>
            </div>

            {tab === 1 && !myPool &&  <CreatePool />}
            {tab === 1 && myPool && myPool.claimed &&  <CreatePool />}
            {tab === 1 && myPool && !myPool.claimed && <CheckPoolStatus pool={myPool}/>}
            {tab === 3 && <PoolsParticipated />}
            {tab === 4 && <PurchasedNFTs />}
        </article>
    );
};
