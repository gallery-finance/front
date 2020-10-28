import React, { useState } from "react";
import { Link } from "react-router-dom";

import { ExhibitionHallCard } from "../components/ExhibitionHall";

import image1 from "../assets/img/exhibition-hall/1.jpg";
import image2 from "../assets/img/exhibition-hall/2.jpg";
import image3 from "../assets/img/exhibition-hall/3.jpg";
import image4 from "../assets/img/exhibition-hall/4.jpg";
import image5 from "../assets/img/exhibition-hall/5.jpg";
import image6 from "../assets/img/exhibition-hall/6.jpg";
import image7 from "../assets/img/exhibition-hall/7.jpg";
import image8 from "../assets/img/exhibition-hall/8.jpg";
import image9 from "../assets/img/exhibition-hall/9.jpg";
import image10 from "../assets/img/exhibition-hall/10.jpg";
import image11 from "../assets/img/exhibition-hall/11.jpg";
import image12 from "../assets/img/exhibition-hall/12.jpg";

const hashtagsList = [
    { id: "1", name: "love" },
    { id: "2", name: "like" },
    { id: "3", name: "photography" },
    { id: "4", name: "instagram" },
    { id: "5", name: "music" },
    { id: "6", name: "follow" },
    { id: "7", name: "travel" },
    { id: "8", name: "instagood" },
    { id: "9", name: "fashion" },
    { id: "10", name: "summer" },
    { id: "11", name: "art" },
    { id: "12", name: "photooftheday" },
    { id: "13", name: "throwback" },
    { id: "14", name: "memories" },
    { id: "15", name: "tbt" },
    { id: "16", name: "a" },
    { id: "17", name: "s" },
    { id: "18", name: "likeforlikes" },
    { id: "19", name: "k" },
    { id: "20", name: "picoftheday" },
    { id: "21", name: "indonesia" },
    { id: "22", name: "photo" },
    { id: "23", name: "happy" },
    { id: "24", name: "o" },
    { id: "25", name: "nature" },
    { id: "26", name: "beautiful" },
    { id: "27", name: "life" },
    { id: "28", name: "f" },
    { id: "29", name: "new" },
    { id: "30", name: "bhfyp" }
];

const exhibitionList = [
    {
        id: "1",
        image: image1,
        title: "Women Mending Nets in the Dunes",
        author: " by Van Gogh",
        hashtags: "#love #photo #art #summer #like #instagram #new",
        date: "24/11/20"
    },
    {
        id: "2",
        image: image2,
        title: "Women Mending Nets in the Dunes",
        author: " by Van Gogh",
        hashtags: "#travel #fashion #summer #art #photooftheday #throwback",
        date: "18/11/20"
    },
    {
        id: "3",
        image: image3,
        title: "Women Mending Nets in the Dunes",
        author: " by Van Gogh",
        hashtags: "#love #like #photography #instagram",
        date: "14/11/20"
    },
    {
        id: "4",
        image: image4,
        title: "Women Mending Nets in the Dunes",
        author: " by Van Gogh",
        hashtags: "#travel #fashion #summer #art #photooftheday #throwback",
        date: "12/11/20"
    },
    {
        id: "5",
        image: image5,
        title: "Women Mending Nets in the Dunes",
        author: " by Van Gogh",
        hashtags: "#love #photo #art #summer #like #instagram #new",
        date: "9/11/20"
    },
    {
        id: "6",
        image: image6,
        title: "Women Mending Nets in the Dunes",
        author: " by Van Gogh",
        hashtags: "#love #photo #art #summer #like #instagram #new",
        date: "2/11/20"
    },
    {
        id: "7",
        image: image7,
        title: "Women Mending Nets in the Dunes",
        author: " by Van Gogh",
        hashtags: "#love #photo #art #summer #like #instagram #new",
        date: "24/10/20"
    },
    {
        id: "8",
        image: image8,
        title: "Women Mending Nets in the Dunes",
        author: " by Van Gogh",
        hashtags: "#love #photo #art #summer #like #instagram #new",
        date: "17/10/20"
    },
    {
        id: "9",
        image: image9,
        title: "Women Mending Nets in the Dunes",
        author: " by Van Gogh",
        hashtags: "#love #photo #art #summer #like #instagram #new",
        date: "15/10/20"
    },
    {
        id: "10",
        image: image10,
        title: "Women Mending Nets in the Dunes",
        author: " by Van Gogh",
        hashtags: "#love #photo #art #summer #like #instagram #new",
        date: "12/10/20"
    },
    {
        id: "11",
        image: image11,
        title: "Women Mending Nets in the Dunes",
        author: " by Van Gogh",
        hashtags: "#love #photo #art #summer #like #instagram #new",
        date: "7/10/20"
    },
    {
        id: "12",
        image: image12,
        title: "Women Mending Nets in the Dunes",
        author: " by Van Gogh",
        hashtags: "#love #photo #art #summer #like #instagram #new",
        date: "2/10/20"
    }
];

export const ExhibitionHallPage = () => {
    const [selectedType, setSelectedType] = useState(-1);
    const [showMoreHashtags, setShowMoreHashtags] = useState(false);
    const [currentTabIsHot, setCurrentTabIsHot] = useState(true);

    const handleSelectHashtag = id => {
        setSelectedType(id);
        console.log(id);
        // fetch items ...
    };

    const handleClickMoreHashtags = () => {
        setShowMoreHashtags(prev => !prev);
    };

    return (
        <article className="exhibition-hall center">
            <header className="exhibition-hall-head">
                <h1 className="exhibition-hall-head__title h1">Exhibition hall</h1>
                <div className="exhibition-hall-head__btn-wrapper">
                    <Link to="/" className="btn btn--border">
                        Publish an artwork
                    </Link>
                </div>
            </header>

            <header className="exhibition-hall-head" style={{ marginTop: 0 }}>
                <h1 className="exhibition-hall-head__title h1">Exhibition hall</h1>
                <div className="exhibition-hall-head__btn-wrapper">
                    <Link to="/" className="btn btn--border">
                        Publish an artwork
                    </Link>
                </div>
            </header>

            <div className="hashtag">
                <div
                    className="hashtag__list"
                    style={showMoreHashtags ? { justifyContent: "center" } : {}}
                >
                    <label className="hashtag__item">
                        <input
                            checked={selectedType === -1}
                            onChange={() => {
                                handleSelectHashtag(-1);
                            }}
                            name="art-type"
                            type="radio"
                            className="hashtag__input visuallyhidden"
                        />
                        <span className="hashtag__label">#All</span>
                    </label>

                    {!showMoreHashtags
                        ? hashtagsList.slice(0, 7).map(item => (
                              <label key={item.id} className="hashtag__item">
                                  <input
                                      checked={item.id === selectedType}
                                      onChange={() => {
                                          handleSelectHashtag(item.id);
                                      }}
                                      name="art-type"
                                      type="radio"
                                      className="hashtag__input visuallyhidden"
                                  />
                                  <span className="hashtag__label">
                                      #{item.name}
                                  </span>
                              </label>
                          ))
                        : hashtagsList.map(item => (
                              <label key={item.id} className="hashtag__item">
                                  <input
                                      checked={item.id === selectedType}
                                      onChange={() => {
                                          handleSelectHashtag(item.id);
                                      }}
                                      name="art-type"
                                      type="radio"
                                      className="hashtag__input visuallyhidden"
                                  />
                                  <span className="hashtag__label">
                                      #{item.name}
                                  </span>
                              </label>
                          ))}

                    {hashtagsList.length > 7 && (
                        <label className="hashtag__item">
                            <button
                                onClick={handleClickMoreHashtags}
                                className="hashtag__input visuallyhidden"
                            />

                            {!showMoreHashtags ? (
                                <span className="hashtag__label hashtag__label--more">
                                    More{" "}
                                    <svg
                                        width="13"
                                        height="8"
                                        viewBox="0 0 13 8"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M0.999999 0.75L6.5 6.25L12 0.75"
                                            stroke="#FAD06A"
                                            strokeWidth="2"
                                        />
                                    </svg>
                                </span>
                            ) : (
                                <span className="hashtag__label hashtag__label--more">
                                    Less{" "}
                                    <svg
                                        width="13"
                                        height="8"
                                        viewBox="0 0 13 8"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M0.999999 7.25L6.5 1.75L12 7.25"
                                            stroke="#FAD06A"
                                            strokeWidth="2"
                                        />
                                    </svg>
                                </span>
                            )}
                        </label>
                    )}
                </div>
            </div>

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
                <label className="tab__btn">
                    <input
                        type="radio"
                        name="tab"
                        className="tab__input visuallyhidden"
                        checked={!currentTabIsHot}
                        onChange={() => setCurrentTabIsHot(false)}
                    />
                    <span className="tab__label">Fresh</span>
                </label>
            </div>

            <div className="exhibition-hall-list">
                {exhibitionList.map(item => (
                    <ExhibitionHallCard key={item.id} item={item} />
                ))}
            </div>
        </article>
    );
};
