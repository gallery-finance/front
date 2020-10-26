import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";

import { MyBalance, MyFigures, MyArtwork, MyNFTs } from "./AccountRoutes";

export const WorkshopAccountPage = () => {
    const [tab, setTab] = useState(1);



    return (
        <>
            <div className="center">
                <ul
                    className="breadcrumbs hidden-sm"
                    itemScope=""
                    itemType="https://schema.org/BreadcrumbList"
                >

                    <li
                        className="breadcrumbs__item"
                        itemProp="itemListElement"
                        itemScope=""
                        itemType="https://schema.org/ListItem"
                    >
                        <Link
                            to="/workshop"
                            className="breadcrumbs__link"
                            itemProp="item"
                        >
                            <span itemProp="name">Workshops</span>
                        </Link>
                        <meta itemProp="position" content="2" />
                    </li>

                    <li
                        className="breadcrumbs__item"
                        itemProp="itemListElement"
                        itemScope=""
                        itemType="https://schema.org/ListItem"
                    >
                        <Link
                            to="/workshop/figures"
                            className="breadcrumbs__link"
                            itemProp="item"
                        >
                            <span itemProp="name">Figures</span>
                        </Link>
                    </li>

                    <li className="breadcrumbs__item">
                        <span>Account</span>
                    </li>
                </ul>
            </div>

            <article className="center account">
                <h1 className="account__title h3">Account</h1>
                <div className="tabs">
                    <div className="tabs__nav">
                        <button
                            className={`tabs__btn button ${
                                tab === 1 && "is-active"
                            }`}
                            onClick={() => setTab(1)}
                        >
                            My Balance
                        </button>

                        <button
                            className={`tabs__btn button ${
                                tab === 2 && "is-active"
                            }`}
                            onClick={() => setTab(2)}
                        >
                            My Figures
                        </button>

                        <button
                            className={`tabs__btn button ${
                                tab === 3 && "is-active"
                            }`}
                            onClick={() => setTab(3)}
                        >
                            My Artwork
                        </button>

                        {/*<button*/}
                            {/*className={`tabs__btn button ${*/}
                                {/*tab === 4 && "is-active"*/}
                            {/*}`}*/}
                            {/*onClick={() => setTab(4)}*/}
                        {/*>*/}
                            {/*My NFTs*/}
                        {/*</button>*/}
                    </div>
                </div>

                {tab === 1 && <MyBalance />}
                {tab === 2 && <MyFigures />}
                {tab === 3 && <MyArtwork />}
                {tab === 4 && <MyNFTs />}
            </article>
        </>
    );
};
