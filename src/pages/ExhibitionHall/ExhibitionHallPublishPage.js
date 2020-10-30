import React, { useState } from "react";

import { BackButton } from "../../components/BackButton";

const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
};

export const ExhibitionHallPublishPage = () => {
    const [image, setImage] = useState();
    const [artwork, setArtwork] = useState();
    const [artist, setArtist] = useState();
    const [hashtags, setHashtags] = useState();
    const [details, setDetails] = useState();
    const [errors, setErrors] = useState({
        image: "",
        artwork: "",
        artist: "",
        hashtags: ""
    });

    const handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;

        switch (name) {
            case "image":
                console.log("image value", value);
                errors.image = value === "" ? "Artwork url cannot be empty" : "";
                setImage(value);
                break;
            case "artwork":
                setArtwork(value);
                errors.artwork =
                    value.length < 1 ? "Artwork name cannot be empty" : "";
                break;
            case "artist":
                setArtist(value);
                errors.artist =
                    value.length < 1 ? "Artist name cannot be empty" : "";
                break;
            case "hashtags":
                setHashtags(value);
                errors.hashtags = value.length < 1 ? "Hashtags cannot be empty" : "";
                break;
            case "details":
                setDetails(value);
            default:
                break;
        }
        setErrors(errors);
    };

    const handleSubmit = event => {
        console.log("info", image, artwork, artist, hashtags, details);
        event.preventDefault();

        if (validateForm(errors)) {
            console.info("Valid Form");
            onSubmit();
        } else {
            console.error("Invalid Form");
        }
    };

    const onSubmit = () => {
        console.log("submit");
    };

    return (
        <article className="center">
            <BackButton toExhibitionHall />

            <form action="/" className="publish-artwork" onSubmit={handleSubmit}>
                <h1 className="publish-artwork__title h3">Publish an Artwork</h1>

                <div className="publish-artwork__buy-wrapper">
                    <div>
                        <button
                            className="btn publish-artwork__buy-btn"
                            type="button"
                        >
                            Buy GLF
                        </button>
                        <p className="publish-artwork__buy-caption">
                            Buy GLF tokens now on Uniswap
                        </p>
                    </div>
                    <div>
                        <svg
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M2 9.5H21C21.2652 9.5 21.5196 9.60536 21.7071 9.79289C21.8946 9.98043 22 10.2348 22 10.5V20.5C22 20.7652 21.8946 21.0196 21.7071 21.2071C21.5196 21.3946 21.2652 21.5 21 21.5H3C2.73478 21.5 2.48043 21.3946 2.29289 21.2071C2.10536 21.0196 2 20.7652 2 20.5V9.5ZM3 3.5H18V7.5H2V4.5C2 4.23478 2.10536 3.98043 2.29289 3.79289C2.48043 3.60536 2.73478 3.5 3 3.5ZM15 14.5V16.5H18V14.5H15Z"
                                fill="#FAD06A"
                            />
                        </svg>
                        <p className="gold-color">Your balance: 111,222 GLF</p>
                    </div>
                </div>

                <div className="publish-artwork__drop publish-artwork__inputbox">
                    <input className="publish-artwork__drop-input" type="file" />
                    <div className="publish-artwork__drop-content">
                        {image ? (
                            <img
                                className="cover"
                                content="no-referrer"
                                src={image}
                            />
                        ) : (
                            <svg
                                className="publish-artwork__drop-logo"
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                            >
                                <path d="M9.5 22.2v1.2l.85-.85L14 18.91l10.65 10.64.35.36.35-.36L32 22.91l5.65 5.64.85.86V9.5h-29v12.7zm.15 5.3l-.15.15V38.5h6.9l.15-.15 5.98-5.97.35-.35-.35-.35-8.18-8.18-.35-.35-.35.35-4 4zM21.5 37.65l-.85.85H38.5v-4.84l-.15-.16-6-6-.35-.35-.35.35L21.5 37.65zM8 6.5h32A1.5 1.5 0 0141.5 8v32a1.5 1.5 0 01-1.5 1.5H8A1.5 1.5 0 016.5 40V8A1.5 1.5 0 018 6.5zm23 13a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                            </svg>
                        )}
                        <p className="publish-artwork__drop-text">
                            Drop your image here, or <b>browse</b>
                        </p>
                        <small className="publish-artwork__drop-format">
                            Supports: JPG, JPEG2000, PNG
                        </small>
                    </div>
                </div>

                <div className="publish-artwork__row">
                    <div className="publish-artwork__row-item publish-artwork__inputbox">
                        <input
                            className={`publish-artwork__input input ${
                                errors.artwork.length > 0 && "input--error"
                            }`}
                            placeholder="Artwork Name"
                            name="artwork"
                            value={artwork}
                            onChange={handleChange}
                            required
                        />
                        {errors.artwork.length > 0 && (
                            <div className="publish-artwork__text-error">
                                Name of the artwork can not be empty
                            </div>
                        )}
                    </div>
                    <div className="publish-artwork__row-item publish-artwork__inputbox">
                        <input
                            className={`publish-artwork__input input ${
                                errors.artist.length > 0 && "input--error"
                            }`}
                            placeholder="Artist name"
                            name="artist"
                            value={artist}
                            onChange={handleChange}
                            required
                        />
                        {errors.artist.length > 0 && (
                            <div className="publish-artwork__text-error">
                                Name of the artist can not be empty
                            </div>
                        )}
                    </div>
                </div>

                <div className="publish-artwork__inputbox">
                    <input
                        className={`publish-artwork__input input ${
                            errors.hashtags.length > 0 && "input--error"
                        }`}
                        placeholder="Hashtags"
                        name="hashtags"
                        value={hashtags}
                        onChange={handleChange}
                        required
                    />
                    {errors.hashtags.length > 0 && (
                        <div className="publish-artwork__text-error">
                            Hashtags can not be empty
                        </div>
                    )}
                </div>

                <div className="publish-artwork__textarea publish-artwork__inputbox">
                    <label
                        htmlFor="publish-artwork-textarea"
                        className="publish-artwork__label"
                    >
                        Details
                    </label>
                    <textarea
                        className="publish-artwork__input input"
                        id="publish-artwork-textarea"
                        placeholder="no more than 200 caharcters"
                        name="details"
                        value={details}
                        onChange={handleChange}
                    />
                </div>

                <p className="publish-artwork__note">
                    Cost of publication is <b>$9.99 in GLF</b> tokens. We will create
                    an NFT token and send it to your wallet. Published artwork will
                    be stored in the decentralized storage forever, with no
                    additional cost.
                </p>

                <button
                    className="publish-artwork__btn btn"
                    type="button"
                    onClick={handleSubmit}
                >
                    Publish
                </button>
            </form>
        </article>
    );
};
