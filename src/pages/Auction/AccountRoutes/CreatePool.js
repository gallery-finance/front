import React, { useState } from "react";

import cover from "../../../assets/img/card-pool/6.png";
import {validateForm} from "../../../utils/form";
import {getContract, useActiveWeb3React} from "../../../web3";
import ERC721 from '../../../web3/abi/ERC721.json'

export const CreatePool = () => {
    const {account, library, chainId} = useActiveWeb3React()
    const [checked, setChecked] = useState(false);
    const [tokenId, setTokenId] = useState()
    const [errors, setErrors] = useState({tokenId: "", name: "", startPrice: "", artist: ""})

    const handleChange = async event => {
        event.preventDefault();
        const {name, value} = event.target;
        console.log('handleChange')
        switch (name) {
            case "tokenId":
                console.log('tokenId value', value)
                const contract = getContract(library, ERC721.abi, '')
                try {
                    const ownerAddress = await contract.methods.ownerOf(value).call()
                    if (ownerAddress.toLowerCase() !== account.toLowerCase()) {
                        errors.tokenId =  "Token ID is invalid";
                    } else {
                        errors.tokenId = ""
                    }
                }catch (e){
                    console.log('confirm token',e)
                    errors.tokenId = "Token ID is invalid"
                }

                break;
            default:
        }

        setErrors(errors)

    };


    const  handleSubmit = (event) =>{
        event.preventDefault();
        console.log('handleSubmit', event)
        if (validateForm(errors)) {
            console.info("Valid Form");
            //onSubmit()
        } else {
            console.error("Invalid Form");

        }
    }

    return (
        <div className="auction-my-pool">
            <div className="modal__box">
                <div className="modal__item">
                    <form
                        id="auction-submit"
                        onSubmit={handleSubmit}
                        className="form-vote-new form-app"
                    >
                        <h3 className="modal__title h3">Create a new NFT auction</h3>
                        <div className="auction-details__image-wrapper">
                            <div className="form-vote-new__img auction-details__image">
                                <picture>
                                    <img
                                        src={cover}
                                        alt=""
                                        loading="lazy"
                                        width="180"
                                        height="115"
                                    />
                                </picture>
                            </div>
                            <div className="auction-my-pool__data">
                                <div>
                                    <p>Token ID:</p>
                                    <div className="form-app__inputbox-input">
                                        <input
                                            onChange={handleChange}
                                            required
                                            className="input input--sm"
                                            type="text"
                                            name="tokenId"
                                        />
                                        {errors.tokenId.length > 0 && (
                                            <div className="form-app__inputbox-input__text-error">
                                                {errors.tokenId}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="auction-my-pool__credits">
                            <div>
                                <p>Name of Auction:</p>
                                <div className="form-app__inputbox-input">
                                    <input
                                        onChange={handleChange}
                                        className="input input--sm"
                                        type="text" />
                                </div>
                            </div>
                            <div>
                                <p>Details:</p>
                                <div className="form-app__inputbox-input">
                                    <textarea className="input input--sm" />
                                </div>
                            </div>
                        </div>

                        <hr />
                        <div className="auction-my-pool__price">
                            <div className="auction-my-pool__price-row">
                                <p>Starting price (Floor price):</p>
                                <div className="auction-my-pool__price-input">
                                    <div className="form-app__inputbox-input">
                                        <input
                                            className="input input--sm"
                                            placeholder="0,00"
                                            type="text"
                                        />
                                    </div>
                                    GLF
                                </div>
                            </div>
                            <div className="auction-my-pool__price-row">
                                <label className="checkbox">
                                    <input
                                        checked={checked}
                                        onChange={() => {
                                            setChecked(prev => !prev);
                                        }}
                                        type="checkbox"
                                        className="checkbox__input visuallyhidden"
                                        required="required"
                                    />
                                    <span className="checkbox__label">
                                        Min bid price increment:
                                    </span>
                                </label>
                                <div className="auction-my-pool__price-input">
                                    <div className="form-app__inputbox-input">
                                        <input
                                            className="input input--sm"
                                            placeholder="0,00"
                                            type="text"
                                            disabled={!checked}
                                        />
                                    </div>
                                    GLF
                                </div>
                            </div>
                        </div>
                        <hr />

                        <div className="form-app__inputbox auction-my-pool__time">
                            <p className="auction-my-pool__time-title">
                                Pool running time:
                            </p>
                            <div className="form-app__inputbox-row">
                                <div>
                                    <p>Days</p>
                                    <div className="form-app__inputbox-input">
                                        <input
                                            className="input input--sm"
                                            type="number"
                                            min={0}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p>Hours</p>
                                    <div className="form-app__inputbox-input">
                                        <input
                                            className="input input--sm"
                                            type="number"
                                            min={0}
                                            max={23}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p>Minutes</p>
                                    <div className="form-app__inputbox-input">
                                        <input
                                            className="input input--sm"
                                            type="number"
                                            min={0}
                                            max={59}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-app__submit form-app__submit--row">
                            <button
                                className="btn btn--outline btn--medium"
                                type="button"
                            >
                                Cancel
                            </button>
                            <button type="submit" form="auction-submit"  className="btn btn--medium">
                                Launch
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
