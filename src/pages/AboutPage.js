import React from "react";
import { Route, NavLink } from "react-router-dom";

export const AboutPage = () => {
    return (
        <article className="about center">
            <div className="about__box">
                <div className="about__bar">
                    <ul>
                        <li>
                            <NavLink exact to="/about" activeClassName="is-active">
                                <svg width="24" height="24" viewBox="0 0 24 24">
                                    <path
                                        strokeWidth="0"
                                        d="M6.25 7.25h-5a.5.5 0 01-.5-.5v-5c0-.28.22-.5.5-.5h5c.28 0 .5.22.5.5v5a.5.5 0 01-.5.5zm-4.5-1h4v-4h-4v4z"
                                    ></path>
                                    <path
                                        strokeWidth="0"
                                        d="M3.75 5.75l-.11-.01a.5.5 0 01-.34-.27l-.96-1.96a.5.5 0 01.9-.44l.69 1.4L8.53.86a.5.5 0 01.61.78l-5.08 4c-.09.07-.2.11-.31.11zM6.25 15.25h-5a.5.5 0 01-.5-.5v-5c0-.28.22-.5.5-.5h5c.28 0 .5.22.5.5v5a.5.5 0 01-.5.5zm-4.5-1h4v-4h-4v4z"
                                    ></path>
                                    <path
                                        strokeWidth="0"
                                        d="M3.75 13.75l-.11-.01a.5.5 0 01-.34-.27l-.96-1.96a.5.5 0 01.9-.44l.69 1.4 4.6-3.62a.5.5 0 01.62.79l-5.1 4a.49.49 0 01-.3.11zM6.25 23.25h-5a.5.5 0 01-.5-.5v-5c0-.27.22-.5.5-.5h5c.28 0 .5.23.5.5v5a.5.5 0 01-.5.5zm-4.5-1h4v-4h-4v4zM22.75 19.25h-11a.5.5 0 010-1h11a.5.5 0 010 1zM22.75 22.25h-11a.5.5 0 010-1h11a.5.5 0 010 1zM22.75 11.25h-11a.5.5 0 010-1h11a.5.5 0 010 1zM22.75 14.25h-11a.5.5 0 010-1h11a.5.5 0 010 1zM22.75 3.25h-11a.5.5 0 010-1h11a.5.5 0 010 1zM22.75 6.25h-11a.5.5 0 010-1h11a.5.5 0 010 1z"
                                    ></path>
                                </svg>
                                Summary
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/about/workshop"
                                activeClassName="is-active"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24">
                                    <path
                                        strokeWidth="0"
                                        d="M11.5 18.25h-.15c-1.92 0-3.62-1.68-3.83-3.68C6.64 14.27 6 13.2 6 12.25v-1c0-.65.42-1.2 1-1.41V8.55c0-1.73.97-2.9 2.41-2.95l.85-.3c1.05-.4 2.15-.82 3.13-.82 1.73 0 2.61 1.27 2.61 3.77v1.7c.4.22 1 .68 1 1.3v1c0 .9-.74 2.02-1.67 2.32-.22 2-1.91 3.68-3.83 3.68zm1.9-12.77c-.81 0-1.82.38-2.79.74l-.95.35a.49.49 0 01-.16.03C8.4 6.6 8 7.6 8 8.55v1.7a.5.5 0 01-.5.5.5.5 0 00-.5.5v1c0 .6.5 1.4 1 1.4.28 0 .5.22.5.5 0 1.65 1.33 3.1 2.85 3.1h.15c1.52 0 2.85-1.45 2.85-3.1 0-.28.22-.5.5-.5.5 0 1.15-.79 1.15-1.4v-1c-.02-.12-.38-.4-.7-.55a.5.5 0 01-.3-.45v-2c0-2.77-1.13-2.77-1.6-2.77z"
                                    ></path>
                                    <path
                                        strokeWidth="0"
                                        d="M20.05 23.25H3a.5.5 0 01-.5-.5 5.4 5.4 0 015.55-5.5.5.5 0 010 1 4.36 4.36 0 00-4.53 4h16a4.36 4.36 0 00-4.52-4 .5.5 0 010-1 5.4 5.4 0 015.55 5.5.5.5 0 01-.5.5zM.5 10.75a.5.5 0 01-.5-.5 3 3 0 013-3 .5.5 0 010 1 2 2 0 00-2 2 .5.5 0 01-.5.5zM23.5 10.75a.5.5 0 01-.5-.5 2 2 0 00-2-2 .5.5 0 010-1 3 3 0 013 3 .5.5 0 01-.5.5z"
                                    ></path>
                                    <path
                                        strokeWidth="0"
                                        d="M11.5 18.25h-.15c-1.92 0-3.62-1.68-3.83-3.68C6.64 14.27 6 13.2 6 12.25v-1c0-.65.42-1.2 1-1.41V8.55c0-1.73.97-2.9 2.41-2.95l.85-.3c1.05-.4 2.15-.82 3.13-.82 1.73 0 2.61 1.27 2.61 3.77v1.7c.4.22 1 .68 1 1.3v1c0 .9-.74 2.02-1.67 2.32-.22 2-1.91 3.68-3.83 3.68zm1.9-12.77c-.81 0-1.82.38-2.79.74l-.95.35a.49.49 0 01-.16.03C8.4 6.6 8 7.6 8 8.55v1.7a.5.5 0 01-.5.5.5.5 0 00-.5.5v1c0 .6.5 1.4 1 1.4.28 0 .5.22.5.5 0 1.65 1.33 3.1 2.85 3.1h.15c1.52 0 2.85-1.45 2.85-3.1 0-.28.22-.5.5-.5.5 0 1.15-.79 1.15-1.4v-1c-.02-.12-.38-.4-.7-.55a.5.5 0 01-.3-.45v-2c0-2.77-1.13-2.77-1.6-2.77z"
                                    ></path>
                                    <path
                                        strokeWidth="0"
                                        d="M20.05 23.25H3a.5.5 0 01-.5-.5 5.4 5.4 0 015.55-5.5.5.5 0 010 1 4.36 4.36 0 00-4.53 4h16a4.36 4.36 0 00-4.52-4 .5.5 0 010-1 5.4 5.4 0 015.55 5.5.5.5 0 01-.5.5zM.5 10.75a.5.5 0 01-.5-.5 3 3 0 013-3 .5.5 0 010 1 2 2 0 00-2 2 .5.5 0 01-.5.5zM23.5 10.75a.5.5 0 01-.5-.5 2 2 0 00-2-2 .5.5 0 010-1 3 3 0 013 3 .5.5 0 01-.5.5zM5 7.75c-1.61 0-2.5-3.38-2.5-4.5a2.5 2.5 0 015 0c0 1.12-.89 4.5-2.5 4.5zm0-6c-.83 0-1.5.67-1.5 1.5 0 1.17.91 3.5 1.5 3.5s1.5-2.33 1.5-3.5c0-.83-.67-1.5-1.5-1.5zM19 7.75c-1.61 0-2.5-3.38-2.5-4.5a2.5 2.5 0 015 0c0 1.12-.89 4.5-2.5 4.5zm0-6c-.83 0-1.5.67-1.5 1.5 0 1.17.91 3.5 1.5 3.5s1.5-2.33 1.5-3.5c0-.83-.67-1.5-1.5-1.5z"
                                    ></path>
                                </svg>
                                Workshop
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about/auction" activeClassName="is-active">
                                <svg width="24" height="24" viewBox="0 0 24 24">
                                    <path
                                        strokeWidth="0"
                                        d="M12 21.75a.5.5 0 01-.4-.2l-11-15a.5.5 0 01-.09-.4.5.5 0 01.24-.33l6-3.5A.5.5 0 017 2.25h10a.5.5 0 01.25.07l6 3.5a.5.5 0 01.15.73l-11 15a.5.5 0 01-.4.2zM1.73 6.4L12 20.4l10.27-14-5.4-3.15H7.13L1.73 6.4z"
                                    ></path>
                                    <path
                                        strokeWidth="0"
                                        d="M12 20.75a.5.5 0 01-.48-.36l-5-17a.5.5 0 01.96-.28l5 17a.5.5 0 01-.48.64z"
                                    ></path>
                                    <path
                                        strokeWidth="0"
                                        d="M12 20.75c-.05 0-.1 0-.14-.02a.5.5 0 01-.34-.62l5-17a.5.5 0 11.96.28l-5 17a.5.5 0 01-.48.36z"
                                    ></path>
                                    <path
                                        strokeWidth="0"
                                        d="M22 7.25H2a.5.5 0 010-1h20a.5.5 0 010 1z"
                                    ></path>
                                </svg>
                                Auction
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/about/exhibition-hall"
                                activeClassName="is-active"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24">
                                    <path
                                        strokeWidth="0"
                                        d="M14.5 20h-5a.5.5 0 01-.5-.5V15c0-.28.22-.5.5-.5s.5.22.5.5v4h4v-4c0-.28.22-.5.5-.5s.5.22.5.5v4.5a.5.5 0 01-.5.5z"
                                    ></path>
                                    <path
                                        strokeWidth="0"
                                        d="M12 22.5a3 3 0 01-3-3c0-.27.22-.5.5-.5s.5.23.5.5a2 2 0 004 0c0-.27.22-.5.5-.5s.5.23.5.5a3 3 0 01-3 3zM7 3.5a.5.5 0 01-.35-.15l-1-1a.5.5 0 01.7-.7l1 1c.2.2.2.51 0 .7A.5.5 0 017 3.5zM17 3.5a.5.5 0 01-.35-.85l1-1c.19-.2.5-.2.7 0 .2.2.2.51 0 .7l-1 1a.5.5 0 01-.35.15zM6 15.5a.5.5 0 01-.35-.85l1-1c.19-.2.5-.2.7 0 .2.2.2.51 0 .7l-1 1a.5.5 0 01-.35.15zM18 15.5a.5.5 0 01-.35-.15l-1-1a.5.5 0 01.7-.7l1 1c.2.2.2.51 0 .7a.5.5 0 01-.35.15zM4 9H3a.5.5 0 01-.5-.5c0-.28.23-.5.5-.5h1a.5.5 0 010 1zM21 9h-1a.5.5 0 010-1h1a.5.5 0 010 1z"
                                    ></path>
                                    <path
                                        strokeWidth="0"
                                        d="M14.5 16h-5a.5.5 0 01-.5-.5v-1.25A6.4 6.4 0 015.5 8.5 6.46 6.46 0 0112 2a6.46 6.46 0 016.5 6.5 6.46 6.46 0 01-3.5 5.74v1.26a.5.5 0 01-.5.5zM10 15h4v-1.07c0-.19.11-.37.3-.45A5.47 5.47 0 0012 3a5.46 5.46 0 00-5.5 5.5 5.46 5.46 0 003.2 4.98c.19.08.3.26.3.45V15z"
                                    ></path>
                                    <path
                                        strokeWidth="0"
                                        d="M9.17 11.83a.5.5 0 01-.35-.15 4.48 4.48 0 010-6.37c.2-.19.51-.19.7 0 .2.2.2.52 0 .71a3.47 3.47 0 000 4.96.5.5 0 01-.35.85zM14.5 18.44a.52.52 0 01-.22-.05l-5-2.44a.5.5 0 11.44-.9l5 2.44a.5.5 0 01.23.67.5.5 0 01-.45.28zM13.6 20a.53.53 0 01-.22-.05l-4.1-2a.5.5 0 01-.23-.67.5.5 0 01.67-.23l4.1 2a.5.5 0 01-.22.95z"
                                    ></path>
                                </svg>
                                Exhibition hall
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/about/glf-token"
                                activeClassName="is-active"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M17 9.38V9h-1.2a1.6 1.6 0 00-1.32.7l-1.42 2.11h-2.73v.38h2.47l-1.27 1.9c-.23.33-.6.53-1 .53h-.5A2.63 2.63 0 017.38 12a2.63 2.63 0 012.65-2.62h3.12V9h-3.12A3.02 3.02 0 007 12c0 1.65 1.36 3 3.03 3h.5a1.6 1.6 0 001.32-.7l1.42-2.11h2.57v-.38h-2.32l1.28-1.9c.22-.33.6-.53 1-.53H17z"
                                        strokeWidth=".5"
                                    ></path>
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="9.5"
                                        fill="none"
                                    ></circle>
                                </svg>
                                GLF Token
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <Route exact path="/about">
                    <div className="about__body">
                        <h1>Summary</h1>
                        <p>
                            Cryptocurrency and blockchain have existed for a long
                            time, but there has never been a decentralized space for
                            artists to experiment. In the art world, cryptocurrencies
                            including NFTs are vehicles for artists to fulfill their
                            needs and dreams in a better way. It is not only about
                            buying low and selling high. We aim to build a space to
                            support the ideology of artists and maintain the
                            integrity of arts, while involving some elements of
                            crypto. In Gallery Finance, you can open a workshop to
                            let the community design and produce NFTs together based
                            on voting, run your own auction for your arts and, store
                            and exhibit your arts forever through decentralized
                            storage.
                        </p>
                    </div>
                </Route>

                <Route exact path="/about/workshop">
                    <div className="about__body">
                        <h1>Workshop</h1>
                        <p>
                            It is sad that defi projects create NFTs and let people
                            mine. Community never had a say in the design and
                            creation of NFTs. The motivation for most of them was
                            wrong. If the intention is to create some fine arts, why
                            would you randomly put free money to mine something you
                            actually do not like. Money takes over your art
                            appreciation intention. Gallery Finance never creates nor
                            designs NFTs, but it is a workshop for the community to
                            build NFTs together. Here, you can create a community
                            workshop to let people vote for themes and select arts
                            and make NFTs.
                        </p>
                    </div>
                </Route>

                <Route exact path="/about/auction">
                    <div className="about__body">
                        <h1>Auction</h1>
                        <p>
                            Auction is a fancy subject, and auctions for arts are
                            even fancier. We think artists should always benefit from
                            transactional values generated from their arts. They
                            should always get some benefits from the change in hands
                            of their arts. So, in gallery, we share transaction fees
                            with the original creators of NFTs to make sure artists
                            are benefitted.
                        </p>
                    </div>
                </Route>

                <Route exact path="/about/exhibition-hall">
                    <div className="about__body">
                        <h1>Exhibition hall</h1>
                        <p>
                            Decentralized storage like Arweave provides a good
                            solution for artists who want to store their pieces
                            permanently. We think this is spiritually in demand that
                            an artist wants his arts to be exhibited forever.
                            Exhibition hall is the place for artists to display their
                            arts and write stories about their pieces. All exhibited
                            arts are stored in decentralized storage.
                        </p>
                    </div>
                </Route>

                <Route exact path="/about/glf-token">
                    <div className="about__body">
                        <h1>GLF tokens</h1>
                        <p>
                            GLF tokens should be in the hands of artists. The main
                            functionalities and utilities of GLF tokens are as
                            followed:
                        </p>
                        <ol>
                            <li>
                                Workshop – token holders can stake to start a
                                workshop, and participants use tokens to participate
                                in the workshop and vote for artworks.
                            </li>
                            <li>
                                Auction – transaction fees will be used to purchase
                                GLF tokens. Half of the transaction fees will be
                                shared with original creators of the NFTs and the
                                other half will be burned forever.
                            </li>
                            <li>
                                Exhibition hall – Artists can use GLF tokens to
                                purchase decentralized storage and store their arts
                                and exhibit arts on gallery finance
                            </li>
                            <li>
                                Pools – the initial distribution of GLF tokens will
                                implement liquidity mining where participants need to
                                stake in the liquidity pool to mine GLF tokens. In
                                the future, the pool will be used to mine NFT arts
                                generated from workshops.
                            </li>
                        </ol>
                        <div className="about__body-total-tokens">
                            Total supply of GLF tokens is 30,000
                        </div>
                        <h2>Token distribution</h2>
                        <p>
                            We distribute our tokens through Farming and the first
                            artist workshop. 15000 tokens will be allocated to
                            farming and 15000 tokens will be allocated through the
                            first artist workshop.
                        </p>
                    </div>
                </Route>
            </div>
        </article>
    );
};