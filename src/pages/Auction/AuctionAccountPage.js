import React, { useState } from "react";

import {
    CreatePool,
    CheckPoolStatus,
    PoolsParticipated,
    PurchasedNFTs
} from "./AccountRoutes";
import { BackButton } from "../../components/BackButton";

export const AuctionAccountPage = () => {
    const userCreatedPool = false;

    const [tab, setTab] = useState(userCreatedPool ? 2 : 1);

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
                            onClick={() => setTab(2)}
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
                        Purchased NFTs
                    </button>
                </div>
            </div>

            {tab === 1 && <CreatePool />}
            {tab === 2 && <CheckPoolStatus />}
            {tab === 3 && <PoolsParticipated />}
            {tab === 4 && <PurchasedNFTs />}
        </article>
    );
};
