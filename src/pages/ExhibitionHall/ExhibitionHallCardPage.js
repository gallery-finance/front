import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {fetchApi} from '../../utils/fetchApi'
import { BackButton } from "../../components/BackButton";
import cardImage from "../../assets/img/exhibition-hall/card.jpg";
import {getNFTTokenAddress} from "../../web3/address";
import {getOpenseaURL} from "../../web3/address";
import {useActiveWeb3React} from "../../web3";

export class ExhibitionHallCardPage extends React.Component {

  async componentWillMount(){
    var id = this.props.match.params.id
    this.setState({isLoading: true})
    var token = await fetchApi('tokens/'+id, {
      method: 'GET'
    })
    this.setState({card: token, isLoading: false})
  }

  render(){
    return this.state.isLoading ? null : 
      <ExhibitionHallCardPageView  card={this.state.card} />
  }
}

const ExhibitionHallCardPageView = ({card}) => {
    const { id } = useParams();
    const {chainId} = useActiveWeb3React()
    if(chainId != null){
      var contractAddress = getNFTTokenAddress(chainId)
      var openseaHref = getOpenseaURL(chainId) + contractAddress + '/' + card.tokenId

    }

    /*
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
    */

    return (
        <article className="center">
            <BackButton toExhibitionHall />

            <div className="exhibition-hall-card__header">
                <h1 className="h1">{card.name}</h1>
                <h3 className="exhibition-hall-card__header__author color-gray">
                    {card.artist}
                </h3>
            </div>

            <div className="exhibition-hall-card">
                <div className="exhibition-hall-card__image">
                    <img src={card.fullimage} />
                </div>
                <div className="exhibition-hall-card__content">
                    <p className="exhibition-hall-card__hashtags">
                        {card.hashtags &&
                            card.hashtags.map(hashtag => (
                                <Link to={`/exhibition-hall/tags/${hashtag}`} key={hashtag}>
                                    #{hashtag}
                                </Link>
                            ))}
                    </p>
                    <table className="exhibition-hall-card__table">
                        <tbody>
                            <tr>
                                <th>Date of Creation:</th>
                                <td>{new Date(card.dateCreated).toLocaleString()}</td>
                            </tr>
                            {/*
                            <tr>
                                <th>Arweave hash:</th>
                                <td className="break-all">{card.hash}</td>
                            </tr>
                            */}
                            <tr>
                                <th>Token ID:</th>
                                <td>{card.tokenId}</td>
                            </tr>
                            {/*
                            <tr>
                                <th>Contract address:</th>
                                <td  className="break-all">
                                    <a href="/">{contractAddress}</a>
                                </td>
                            </tr>
                            */}
                            <tr>
                                <th>Details:</th>
                                <td>{card.description}</td>
                            </tr>
                        </tbody>
                            <tr>
                                <th>Opensea</th>
                                <td>
                                  <a target="__blank" href={openseaHref}>
                                      View on Opensea
                                  </a>
                                </td>
                            </tr>
                    </table>
                    <div className="form-app__submit">
                        <Link to={`/exhibition-hall/`} 
                            className="btn btn--outline btn--medium modal__close"
                            type="button"
                        >
                            OK
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
};
