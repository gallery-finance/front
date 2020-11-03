// import React from "react";
// import { Link } from "react-router-dom";
//
// import image1 from "../../assets/img/auction/img--mobile.webp";
// import image2 from "../../assets/img/auction/img--mobile@2x.webp";
// import image3 from "../../assets/img/auction/img--mobile.png";
// import image4 from "../../assets/img/auction/img--mobile@2x.png";
// import image5 from "../../assets/img/auction/img.webp";
// import image6 from "../../assets/img/auction/img@2x.webp";
// import image7 from "../../assets/img/auction/img.png";
// import image8 from "../../assets/img/auction/img@2x.png";
//
// export const AuctionPage = () => (
//     <article className="auction center">
//       <div className="auction__body">
//         <h1 className="h1">Decentralized NFT Auction</h1>
//
//         <p>
//           We believe that the artists should always be rewarded. That is why
//           when you create an art piece, you will earn money every time it is
//           sold via the auction: we allocate 50% of the transaction fees to the
//           original creators of sold NFTs.
//         </p>
//
//         <div className="auction__btn">
//           <Link to="/" className="">
//             Coming Soon!
//           </Link>
//         </div>
//       </div>
//
//       <div className="auction__img">
//         <picture>
//           <source
//               srcSet={`${image1} 1x, ${image2} 2x`}
//               type="image/webp"
//               media="(max-width: 360px)"
//           />
//           <source
//               srcSet={`${image3} 1x, ${image4} 2x`}
//               media="(max-width: 360px)"
//           />
//
//           <source srcSet={`${image5} 1x, ${image6} 2x`} type="image/webp" />
//           <source srcSet={`${image7} 1x, ${image8} 2x`} />
//
//           <img src={image7} width="566" height="437" loading="lazy" alt="" />
//         </picture>
//       </div>
//     </article>
// );



import React from "react";
import { Link } from "react-router-dom";

import { AuctionCard } from "../../components/Auction";
import { BackButton } from "../../components/BackButton";
import { SearchIcon } from "../../icons";

import cover_1 from "../../assets/img/card-pool/1.png";
import cover_2 from "../../assets/img/card-pool/2.png";
import cover_3 from "../../assets/img/card-pool/3.png";
import cover_4 from "../../assets/img/card-pool/4.png";
import cover_5 from "../../assets/img/card-pool/5.png";
import cover_6 from "../../assets/img/card-pool/6.png";
import {usePolls} from "./Hooks";

const poolList = [
  {
    id: "13",
    type: "live",
    label: "Starry Night",
    cover: cover_1,
    token: "0x84e517408ba6b891b9ac74b2f90013fcbc516d9d"
  },
  {
    id: "13",
    type: "closed",
    label: "Portrait of the Postman Joseph...",
    cover: cover_2,
    token: "0x84e517408ba6b891b9ac74b2f90013fcbc516d9d"
  },
  {
    id: "13",
    type: "filled",
    label: "Wheatfield with Crows",
    cover: cover_3,
    token: "0x84e517408ba6b891b9ac74b2f90013fcbc516d9d"
  },
  {
    id: "13",
    type: "closed",
    label: "Portrait of the Postman Joseph...",
    cover: cover_4,
    token: "0x84e517408ba6b891b9ac74b2f90013fcbc516d9d"
  },
  {
    id: "13",
    type: "live",
    label: "Starry Night",
    cover: cover_5,
    token: "0x84e517408ba6b891b9ac74b2f90013fcbc516d9d"
  },
  {
    id: "13",
    type: "filled",
    label: "Wheatfield with Crows",
    cover: cover_6,
    token: "0x84e517408ba6b891b9ac74b2f90013fcbc516d9d"
  }
];

export const AuctionPage = () => {

  const {pools} = usePolls()

  return (
      <article className="center auction">
        <BackButton toHome />

        <header className="head-page">
          <h1 className="head-page__title h1">Decentralized NFT Auction</h1>
        </header>

        <div className="voter-head">
          <div className="voter-head__dashboard">
            <div className="voter-head__dashboard-account">
              <div className="voter-head__dashboard-ico">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 22H10V24H24V22Z" fill="#FAD06A" />
                  <path
                      d="M12 19.9838C12 19.7186 12.1054 19.4642 12.2929 19.2767C12.4804 19.0891 12.7348 18.9838 13 18.9838H21C21.2652 18.9838 21.5196 19.0891 21.7071 19.2767C21.8946 19.4642 22 19.7186 22 19.9838V21H12V19.9838Z"
                      fill="#FAD06A"
                  />
                  <path
                      d="M10.3935 11.8078C10.8594 12.3044 11.2501 12.8665 11.5532 13.4763L3.32222 21.7073C3.13469 21.8948 2.88039 22.0001 2.61522 22.0001C2.35006 22.0001 2.09575 21.8948 1.90822 21.7073L0.493971 20.293C0.401107 20.2002 0.327443 20.0899 0.277185 19.9686C0.226927 19.8473 0.201059 19.7172 0.201059 19.5859C0.201059 19.4546 0.226927 19.3245 0.277185 19.2032C0.327443 19.0819 0.401107 18.9716 0.493971 18.8788L8.72497 10.65C9.33584 10.9505 9.89824 11.3407 10.3935 11.8078Z"
                      fill="#FAD06A"
                  />
                  <path
                      d="M15.3432 6.85799C16.0994 7.55979 16.9748 8.121 17.9282 8.51524L12.7597 13.6837C12.3619 12.732 11.8002 11.8575 11.1 11.1C10.3437 10.3982 9.46831 9.83695 8.51497 9.44249L13.6837 4.27499C14.0816 5.22638 14.6433 6.10062 15.3432 6.85799Z"
                      fill="#FAD06A"
                  />
                  <path
                      d="M11.8092 0.495547L13.2232 1.90955C13.6136 2.30001 13.6136 2.93308 13.2232 3.32355L7.56718 8.97955C7.17671 9.37001 6.54364 9.37001 6.15318 8.97955L4.73918 7.56555C4.34871 7.17508 4.34872 6.54201 4.73918 6.15155L10.3952 0.495547C10.7856 0.105082 11.4187 0.105082 11.8092 0.495547Z"
                      fill="#FAD06A"
                  />
                  <path
                      d="M20.2945 8.97919L21.7085 10.3932C22.099 10.7837 22.099 11.4167 21.7085 11.8072L16.0525 17.4632C15.6621 17.8537 15.029 17.8537 14.6385 17.4632L13.2245 16.0492C12.8341 15.6587 12.8341 15.0257 13.2245 14.6352L18.8805 8.97919C19.271 8.58872 19.9041 8.58872 20.2945 8.97919Z"
                      fill="#FAD06A"
                  />
                </svg>
              </div>
              <Link to="/auction/account" className="link">
                Account
              </Link>
            </div>
            <div className="voter-head__dashboard-power">
              <p>
                Auction fee pool: <b>100 GLF</b>
              </p>
            </div>
            <div className="voter-head__dashboard-btn">
              <div className="auction-header__input">
                <input type="text" placeholder="Search auction..." />
                <button className="auction-header__input-icon">
                  <SearchIcon />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="auction-list">
          <div className="auction-list__list">
            {pools.map(item => (
                <AuctionCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </article>
  );
};
