import React from "react";
import { Link } from "react-router-dom";

import { StageCard } from "../../components/Workshop";

import image1 from "../../assets/img/workshop/first-workshop.webp";
import image2 from "../../assets/img/workshop/first-workshop@2x.webp";
import image3 from "../../assets/img/workshop/first-workshop.png";
import image4 from "../../assets/img/workshop/first-workshop@2x.png";
import image5 from "../../assets/img/workshop/first-workshop.png";

export const WorkshopPage = () => {
    return (
        <article className="center">
            <header className="workshop-head">
                <h1 className="workshop-head__title h1">Workshop #1</h1>
            </header>

            <div className="workshop-info">
                <dl className="workshop-info__dl">
                    <div className="workshop-info__dl-row">
                        <dt className="workshop-info__dl-dt">Theme:</dt>

                        <dd className="workshop-info__dl-dd">
                            10 community most-wanted figures, portrayed
                        </dd>
                    </div>

                    <div className="workshop-info__dl-row">
                        <dt className="workshop-info__dl-dt">Date:</dt>

                        <dd className="workshop-info__dl-dd">
                            10/22/2020-11/20/2020
                        </dd>
                    </div>

                    <div className="workshop-info__dl-row">
                        <dt className="workshop-info__dl-dt">Participants:</dt>

                        <dd className="workshop-info__dl-dd">GLF token holders</dd>
                    </div>

                    <div className="workshop-info__dl-row">
                        <dt className="workshop-info__dl-dt">Workshop Prize:</dt>

                        <dd className="workshop-info__dl-dd">
                            14000 GLF tokens + NFT mining
                        </dd>
                    </div>
                </dl>

                <picture>
                    <source
                        srcSet={`${image1} 1x, ${image2} 2x`}
                        type="image/webp"
                    />
                    <source srcSet={`${image3} 1x, ${image4} 2x`} />

                    <img
                        className="workshop-info__img"
                        src={image5}
                        width="300"
                        height="168"
                        loading="lazy"
                        alt="First workshop"
                    />
                </picture>
            </div>

            <div className="workshop-cards">
                <div className="workshop-cards__list">
                    <StageCard
                        link={"/workshop/figures"}
                        active
                        number={1}
                        stageText="Stage One"
                        title="Vote for the 10 most-wanted figures"
                        timeIn="10/22/2020 -10/25/2020"
                        status="finished"
                        description={
                            <>
                                You can propose a figure or you can vote for a figure
                                in the voting board. The top 10 figures that get most
                                votes will be selected to next stage. You need to
                                stake your GLF tokens for votes. Voters for the final
                                figures will together share 4000 GLF token rewards.{" "}
                                <a target="_blank" href="https://gallery-finance.medium.com/top-10-most-wanted-the-first-nft-workshop-on-gallery-finance-53751b7f4f8e">Read details</a>
                            </>
                        }
                    />
                    <StageCard
                        active
                        link={"/workshop/artwork"}
                        number={2}
                        stageText="Stage Two"
                        title="Vote for the best artwork"
                        timeIn="10/26/2020-10/30/2020"
                        status="live"
                        description={
                            <>
                                Once the top-10 figures are selected, artists get to
                                draw them and submit the result, while others get to
                                vote for the entries they like the most. Once the
                                vote is over, the top-3 submissions will move onto
                                the next stage; their authors and voters will share
                                10,000 GLF tokens as a reward.{" "}
                                <a target="_blank" href="https://gallery-finance.medium.com/top-10-most-wanted-the-first-nft-workshop-on-gallery-finance-53751b7f4f8e" to="/">Read details</a>
                            </>
                        }
                    />
                    <StageCard
                        number={3}
                        stageText="Stage Three"
                        title="Mine the resulting NFTs"
                        timeIn="10/31/2020-11/20/2020"
                        status="preparation"
                        description="The top-3 artworks are turned into NFTs, and GLF holders proceed to mine them. The holders can use their reward points (obtained through staking) to redeem the NFT artworks and get them transferred to their wallets. The obtained NFTs can be held for collection purposes or sold via the auction."
                    />
                </div>
            </div>
        </article>
    );
};
