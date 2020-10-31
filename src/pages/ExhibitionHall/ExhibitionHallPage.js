import React from "react";
import { Link } from "react-router-dom";

import image1 from "../../assets/img/exhibition-hall/img--mobile.webp";
import image2 from "../../assets/img/exhibition-hall/img--mobile@2x.webp";
import image3 from "../../assets/img/exhibition-hall/img--mobile.png";
import image4 from "../../assets/img/exhibition-hall/img--mobile@2x.png";
import image5 from "../../assets/img/exhibition-hall/img.webp";
import image6 from "../../assets/img/exhibition-hall/img@2x.webp";
import image7 from "../../assets/img/exhibition-hall/img.png";
import image8 from "../../assets/img/exhibition-hall/img@2x.png";

export const ExhibitionHallPage = () => (
    <article className="exhibition-hall center">
        <div className="exhibition-hall__body">
            <h1 className="h1">
                Experience <br />
                is more important than money.
            </h1>

            <p>
                We believe that the artists should always be rewarded. That is why
                when you create an art piece, you will earn money every time it is
                sold via the auction: we allocate 50% of the transaction fees to the
                original creators of sold NFTs.
            </p>

            <p>
                Additionally, creators can share their personal story and give more
                background on their work, getting more people to talk about it.
            </p>

            <div className="exhibition-hall__btn">
                <Link to="/" className="">
                    Coming Soon!
                </Link>
            </div>
        </div>

        <div className="exhibition-hall__img">
            <picture>
                <source
                    srcSet={`${image1} 1x, ${image2} 2x`}
                    type="image/webp"
                    media="(max-width: 360px)"
                />
                <source
                    srcSet={`${image3} 1x, ${image4} 2x`}
                    media="(max-width: 360px)"
                />

                <source srcSet={`${image5} 1x, ${image6} 2x`} type="image/webp" />
                <source srcSet={`${image7} 1x, ${image8} 2x`} />

                <img src={image7} width="566" height="437" loading="lazy" alt="" />
            </picture>
        </div>
    </article>
);

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
//
// import {
//     ExhibitionHallCard,
//     ExhibitionHallSlider
// } from "../../components/ExhibitionHall";
//
// import image1 from "../../assets/img/exhibition-hall/1.jpg";
// import image2 from "../../assets/img/exhibition-hall/2.jpg";
// import image3 from "../../assets/img/exhibition-hall/3.jpg";
// import image4 from "../../assets/img/exhibition-hall/4.jpg";
// import image5 from "../../assets/img/exhibition-hall/5.jpg";
// import image6 from "../../assets/img/exhibition-hall/6.jpg";
// import image7 from "../../assets/img/exhibition-hall/7.jpg";
// import image8 from "../../assets/img/exhibition-hall/8.jpg";
// import image9 from "../../assets/img/exhibition-hall/9.jpg";
// import image10 from "../../assets/img/exhibition-hall/10.jpg";
// import image11 from "../../assets/img/exhibition-hall/11.jpg";
// import image12 from "../../assets/img/exhibition-hall/12.jpg";
//
// const hashtagsList = [
//     "love",
//     "like",
//     "photography",
//     "instagram",
//     "music",
//     "follow",
//     "travel",
//     "instagood",
//     "fashion",
//     "summer",
//     "art",
//     "photooftheday",
//     "throwback",
//     "memories",
//     "tbt",
//     "a",
//     "s",
//     "likeforlikes",
//     "k",
//     "picoftheday",
//     "indonesia",
//     "photo",
//     "happy",
//     "o",
//     "nature",
//     "beautiful",
//     "life",
//     "f",
//     "new",
//     "bhfyp"
// ];
//
// const exhibitionList = [
//     {
//         id: "1",
//         image: image1,
//         title: "Women Mending Nets in the Dunes",
//         author: "by Van Gogh",
//         hashtags: ["love", "photo", "art", "summer", "like", "instagram", "new"],
//         date: "24/11/20"
//     },
//     {
//         id: "2",
//         image: image2,
//         title: "Women Mending Nets in the Dunes",
//         author: "by Van Gogh",
//         hashtags: [
//             "travel",
//             "fashion",
//             "summer",
//             "art",
//             "photooftheday",
//             "throwback"
//         ],
//         date: "18/11/20"
//     },
//     {
//         id: "3",
//         image: image3,
//         title: "Women Mending Nets in the Dunes",
//         author: "by Van Gogh",
//         hashtags: ["love", "like", "photography", "instagram"],
//         date: "14/11/20"
//     },
//     {
//         id: "4",
//         image: image4,
//         title: "Women Mending Nets in the Dunes",
//         author: "by Van Gogh",
//         hashtags: [
//             "travel",
//             "fashion",
//             "summer",
//             "art",
//             "photooftheday",
//             "throwback"
//         ],
//         date: "12/11/20"
//     },
//     {
//         id: "5",
//         image: image5,
//         title: "Women Mending Nets in the Dunes",
//         author: "by Van Gogh",
//         hashtags: ["love", "photo", "art", "summer", "like", "instagram", "new"],
//         date: "9/11/20"
//     },
//     {
//         id: "6",
//         image: image6,
//         title: "Women Mending Nets in the Dunes",
//         author: "by Van Gogh",
//         hashtags: ["love", "photo", "art", "summer", "like", "instagram", "new"],
//         date: "2/11/20"
//     },
//     {
//         id: "7",
//         image: image7,
//         title: "Women Mending Nets in the Dunes",
//         author: "by Van Gogh",
//         hashtags: ["love", "photo", "art", "summer", "like", "instagram", "new"],
//         date: "24/10/20"
//     },
//     {
//         id: "8",
//         image: image8,
//         title: "Women Mending Nets in the Dunes",
//         author: "by Van Gogh",
//         hashtags: ["love", "photo", "art", "summer", "like", "instagram", "new"],
//         date: "17/10/20"
//     },
//     {
//         id: "9",
//         image: image9,
//         title: "Women Mending Nets in the Dunes",
//         author: "by Van Gogh",
//         hashtags: ["love", "photo", "art", "summer", "like", "instagram", "new"],
//         date: "15/10/20"
//     },
//     {
//         id: "10",
//         image: image10,
//         title: "Women Mending Nets in the Dunes",
//         author: "by Van Gogh",
//         hashtags: ["love", "photo", "art", "summer", "like", "instagram", "new"],
//         date: "12/10/20"
//     },
//     {
//         id: "11",
//         image: image11,
//         title: "Women Mending Nets in the Dunes",
//         author: "by Van Gogh",
//         hashtags: ["love", "photo", "art", "summer", "like", "instagram", "new"],
//         date: "7/10/20"
//     },
//     {
//         id: "12",
//         image: image12,
//         title: "Women Mending Nets in the Dunes",
//         author: "by Van Gogh",
//         hashtags: ["love", "photo", "art", "summer", "like", "instagram", "new"],
//         date: "2/10/20"
//     }
// ];
//
// export const ExhibitionHallPage = () => {
//     const [selectedType, setSelectedType] = useState(-1);
//     const [showMoreHashtags, setShowMoreHashtags] = useState(false);
//     const [currentTabIsHot, setCurrentTabIsHot] = useState(true);
//
//     const handleSelectHashtag = hashtagName => {
//         setSelectedType(hashtagName);
//         // fetch items ...
//     };
//
//     const handleClickMoreHashtags = () => {
//         setShowMoreHashtags(prev => !prev);
//     };
//
//     const handleCardHashtagClick = hashtagName => {
//         setSelectedType(hashtagName);
//         // fetch items ...
//     };
//
//     return (
//         <article className="exhibition-hall center">
//             <header className="exhibition-hall-head">
//                 <h1 className="exhibition-hall-head__title h1">Exhibition hall</h1>
//                 <div className="exhibition-hall-head__btn-wrapper">
//                     <Link to="/exhibition-hall/publish" className="btn btn--border">
//                         Publish an artwork
//                     </Link>
//                 </div>
//             </header>
//
//             <ExhibitionHallSlider />
//
//             <div className="hashtag">
//                 <div
//                     className="hashtag__list"
//                     style={showMoreHashtags ? { justifyContent: "center" } : {}}
//                 >
//                     <label className="hashtag__item">
//                         <input
//                             checked={selectedType === -1}
//                             onChange={() => {
//                                 handleSelectHashtag(-1);
//                             }}
//                             name="art-type"
//                             type="radio"
//                             className="hashtag__input visuallyhidden"
//                         />
//                         <span className="hashtag__label">#All</span>
//                     </label>
//
//                     {!showMoreHashtags
//                         ? hashtagsList.slice(0, 7).map(hashtag => (
//                               <label key={hashtag} className="hashtag__item">
//                                   <input
//                                       checked={hashtag === selectedType}
//                                       onChange={() => {
//                                           handleSelectHashtag(hashtag);
//                                       }}
//                                       name="art-type"
//                                       type="radio"
//                                       className="hashtag__input visuallyhidden"
//                                   />
//                                   <span className="hashtag__label">#{hashtag}</span>
//                               </label>
//                           ))
//                         : hashtagsList.map(hashtag => (
//                               <label key={hashtag} className="hashtag__item">
//                                   <input
//                                       checked={hashtag === selectedType}
//                                       onChange={() => {
//                                           handleSelectHashtag(hashtag);
//                                       }}
//                                       name="art-type"
//                                       type="radio"
//                                       className="hashtag__input visuallyhidden"
//                                   />
//                                   <span className="hashtag__label">#{hashtag}</span>
//                               </label>
//                           ))}
//
//                     {hashtagsList.length > 7 && (
//                         <label className="hashtag__item">
//                             <button
//                                 onClick={handleClickMoreHashtags}
//                                 className="hashtag__input visuallyhidden"
//                             />
//
//                             {!showMoreHashtags ? (
//                                 <span className="hashtag__label hashtag__label--more">
//                                     More{" "}
//                                     <svg
//                                         width="13"
//                                         height="8"
//                                         viewBox="0 0 13 8"
//                                         fill="none"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                     >
//                                         <path
//                                             d="M0.999999 0.75L6.5 6.25L12 0.75"
//                                             stroke="#FAD06A"
//                                             strokeWidth="2"
//                                         />
//                                     </svg>
//                                 </span>
//                             ) : (
//                                 <span className="hashtag__label hashtag__label--more">
//                                     Less{" "}
//                                     <svg
//                                         width="13"
//                                         height="8"
//                                         viewBox="0 0 13 8"
//                                         fill="none"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                     >
//                                         <path
//                                             d="M0.999999 7.25L6.5 1.75L12 7.25"
//                                             stroke="#FAD06A"
//                                             strokeWidth="2"
//                                         />
//                                     </svg>
//                                 </span>
//                             )}
//                         </label>
//                     )}
//                 </div>
//             </div>
//
//             <div className="tab">
//                 <label className="tab__btn">
//                     <input
//                         type="radio"
//                         name="tab"
//                         className="tab__input visuallyhidden"
//                         checked={currentTabIsHot}
//                         onChange={() => setCurrentTabIsHot(true)}
//                     />
//                     <span className="tab__label">Hot</span>
//                 </label>
//                 <label className="tab__btn">
//                     <input
//                         type="radio"
//                         name="tab"
//                         className="tab__input visuallyhidden"
//                         checked={!currentTabIsHot}
//                         onChange={() => setCurrentTabIsHot(false)}
//                     />
//                     <span className="tab__label">Fresh</span>
//                 </label>
//             </div>
//
//             <div className="exhibition-hall-list">
//                 {exhibitionList.map(item => (
//                     <ExhibitionHallCard
//                         key={item.id}
//                         item={item}
//                         handleHashtagClick={handleCardHashtagClick}
//                     />
//                 ))}
//             </div>
//         </article>
//     );
// };
