import React, { useState } from "react";
import { Link } from "react-router-dom";

import { VoteCardList } from "../../components/Workshop";
import {useGLFBalance} from "../Hooks";
import {formatAmount} from "../../utils/format";
import {useProposals} from "./Hooks";

export const WorkshopArtworkPage = () => {

    const {proposals} = useProposals()
    const {glfBalance} =useGLFBalance()
    const [currentTabIsHot, setCurrentTabIsHot] = useState(true);
    const [selectedType, setSelectedType] = useState(-1);


    return (
        <article className="center">
            <div className="center">
                <ul className="breadcrumbs hidden-sm">
                    <li className="breadcrumbs__item">
                        <Link to="/" className="breadcrumbs__link">
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className="breadcrumbs__item">
                        <Link to="/workshop" className="breadcrumbs__link">
                            <span>Workshops</span>
                        </Link>
                    </li>
                    <li className="breadcrumbs__item">
                        <span>Artwork</span>
                        <link href="http://gf.wndrbase.com/workshop/voter" />
                    </li>
                </ul>
            </div>

            <header className="voter-head">
                <h1 className="voter-head__title h3">Vote for the Artwork</h1>
                <div className="voter-head__dashboard">
                    <div className="voter-head__dashboard-account">
                        <div className="voter-head__dashboard-ico">
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <path d="M2 9h19a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V9zm1-6h15v4H2V4a1 1 0 011-1zm12 11v2h3v-2h-3z"></path>
                            </svg>
                        </div>
                        <Link to="/workshop/account" className="link line">
                            Account
                        </Link>
                    </div>
                    <div className="voter-head__dashboard-power">
                        <p>
                            Your Voting Power: <b>{glfBalance && formatAmount(glfBalance)} GLF</b>
                        </p>
                    </div>
                    <div className="voter-head__dashboard-btn">
                        <Link to="/workshop/submit" className="btn">
                            Propose an artwork
                        </Link>
                    </div>
                </div>
            </header>

            <div className="tab">
                <label className="tab__btn">
                    <input
                        type="radio"
                        name="tab"
                        className="tab__input visuallyhidden"
                        checked={currentTabIsHot}
                        onChange={() => setCurrentTabIsHot(true)}
                    />
                    <span className="tab__label">Hot</span>
                </label>

                {/*<label className="tab__btn">*/}
                {/*    <input*/}
                {/*        type="radio"*/}
                {/*        name="tab"*/}
                {/*        className="tab__input visuallyhidden"*/}
                {/*        checked={!currentTabIsHot}*/}
                {/*        onChange={() => setCurrentTabIsHot(false)}*/}
                {/*    />*/}
                {/*    <span className="tab__label">Fresh</span>*/}
                {/*</label>*/}
            </div>

            <div className="hashtag">
                <div className="hashtag__list">
                    <label className="hashtag__item">
                        <input
                            checked={selectedType === -1}
                            onChange={()=>{
                                setSelectedType(-1)
                            }}
                            name="art-type"
                            type="radio"
                            className="hashtag__input visuallyhidden"
                        />
                        <span className="hashtag__label">#All</span>
                    </label>

                    {proposals.slice(0,10).map(item =>{
                        return (
                            <label className="hashtag__item">
                                <input
                                    checked={item.id === selectedType}
                                    onChange={(e)=>{
                                        setSelectedType(item.id)
                                    }}
                                    name="art-type"
                                    type="radio"
                                    className="hashtag__input visuallyhidden"
                                />
                                <span className="hashtag__label">#{item.name}</span>
                            </label>
                        )
                    })}
                </div>
            </div>

            <VoteCardList type={selectedType}/>
        </article>
    );
};
