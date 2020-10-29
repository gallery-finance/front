import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: (
        <svg
            width="27"
            height="92"
            viewBox="0 0 27 92"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M26 91L2 46L26 1" strokeWidth="2" />
        </svg>
    ),
    nextArrow: (
        <svg
            width="27"
            height="92"
            viewBox="0 0 27 92"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M1 91L25 46L1 1" strokeWidth="2" />
        </svg>
    )
};

export const ExhibitionHallSlider = () => {
    return (
        <div className="exhibition-hall-slider">
            <Slider {...settings}>
                <div>
                    <h3>Become a sponsor</h3>
                </div>
                <div>
                    <h3>Join a Contest</h3>
                </div>
                <div>
                    <h3>NFT for free!</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>
                <div>
                    <h3>5</h3>
                </div>
                <div>
                    <h3>6</h3>
                </div>
            </Slider>
        </div>
    );
};
