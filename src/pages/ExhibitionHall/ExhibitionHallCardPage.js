import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { BackButton } from "../../components/BackButton";
import cardImage from "../../assets/img/exhibition-hall/card.jpg";

export const ExhibitionHallCardPage = () => {
    const { id } = useParams();
    const [testCard, setTestCard] = useState({});

    useEffect(() => {
        // fetch by id ...
        setTestCard({
            id: id,
            title: "Women Mending Nets in the Dunes",
            author: "by Van Gogh",
            image: cardImage,
            hashtags: ["like", "love", "photography", "instagram", "summer"],
            date: "24/12/20",
            hash: "fVO4F0ZeGxcXDH5r76sJRsxfX2...E6HYJMYQrQu6Q",
            tokenID: "12",
            address: "0x84e517408ba6b891b9ac74b2f90013fcbc516d9d",
            details: `
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. 
                Velit officia consequat duis enim velit mollit. 
                Exercitation veniam consequat sunt nostrud amet.
            `
        });
    }, []);

    return (
        <article className="center">
            <BackButton toExhibitionHall />

            <div className="exhibition-hall-card__header">
                <h1 className="h1">{testCard.title}</h1>
                <h3 className="exhibition-hall-card__header__author color-gray">
                    {testCard.author}
                </h3>
            </div>

            <div className="exhibition-hall-card">
                <div className="exhibition-hall-card__image">
                    <img src={testCard.image} alt="`$`" width="704" height="510" />
                </div>
                <div className="exhibition-hall-card__content">
                    <p className="exhibition-hall-card__hashtags">
                        {testCard.hashtags &&
                            testCard.hashtags.map(hashtag => (
                                <Link to="/exhibition-hall" key={hashtag}>
                                    #{hashtag}
                                </Link>
                            ))}
                    </p>
                    <table className="exhibition-hall-card__table">
                        <tbody>
                            <tr>
                                <th>Date of Creation:</th>
                                <td>{testCard.date}</td>
                            </tr>
                            <tr>
                                <th>Arweave hash:</th>
                                <td className="break-all">{testCard.hash}</td>
                            </tr>
                            <tr>
                                <th>Token ID:</th>
                                <td>{testCard.tokenID}</td>
                            </tr>
                            <tr>
                                <th>Contract address:</th>
                                <td  className="break-all">
                                    <a href="/">{testCard.address}</a>
                                </td>
                            </tr>
                            <tr>
                                <th>Details:</th>
                                <td>{testCard.details}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="form-app__submit">
                        <button
                            className="btn btn--outline btn--medium modal__close"
                            type="button"
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
};
