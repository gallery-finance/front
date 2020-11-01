import {useState, useEffect} from 'react';
import ERC721 from '../../web3/abi/ERC721.json'
import Gallery from '../../web3/abi/Gallery.json'
import FigureSwap from '../../web3/abi/FigureSwap.json'
import {getContract, useActiveWeb3React} from "../../web3";
import {getFigureSwapAddress, getGalleryAddress, getGalleryNFTAddress} from "../../web3/address";
import BigNumber from "bignumber.js";

export const useNFTList = () => {
  const {account, active, library, chainId} = useActiveWeb3React()
  const [nftList, seNFTList] = useState([])

  function queryNFTList() {

    try {
      const contract = getContract(library, Gallery.abi, getGalleryAddress(chainId))
      const fixContract = getContract(library, FigureSwap.abi, getFigureSwapAddress(chainId))
      let list = [];
      for (let i = 0; i < 10; i++) {
        contract.methods.topProposals(i).call().then(proposalId =>{
          if(!(new BigNumber(proposalId).isGreaterThan('1000000000000'))){
            console.log('topProposals', proposalId)
            for (let j = 0; j < 3; j++) {
              console.log('query nft request',proposalId,j)
              contract.methods.getTopFigure(proposalId, j).call().then(figureId => {
                console.log('query nft result', figureId)
                if(!(new BigNumber(figureId).isGreaterThan('1000000000000'))){
                  console.log('getTopFigure',proposalId, figureId)
                  fixContract.methods.cardIds(proposalId, figureId).call().then( async cardId =>{
                    console.log('query card id', cardId)
                    if(!(new BigNumber(cardId).isEqualTo('0'))){
                      console.log('query cardIds', cardId)
                      const card = {}
                      card.points = await fixContract.methods.cardPoints(proposalId, figureId).call()
                      const figure = await contract.methods.figures(figureId).call()
                      console.log('figure', figure)
                      const info = JSON.parse(figure.info)
                      card.name = info.name
                      card.title = info.title
                      card.image = info.image
                      card.proposalId = proposalId
                      card.figureId = figureId
                      list = list.concat(card)
                      seNFTList(nftList.concat(list))
                      // const erc721Contract = getContract(library, ERC721.abi, getGalleryNFTAddress(chainId))
                      // const uri = await erc721Contract.methods.baseURI().call()
                      // console.log('uri--->',uri)
                      //
                      // const nftResult = await fetch(uri)
                      // const nftJson = await nftResult.json()
                    }
                  })
                }
              })
            }
          }
        })


      }
    } catch (e) {
      console.log('query nft list error', e)
    }
  }

  useEffect(()=>{
    if(active){
      queryNFTList()
    }

  }, [active])

  return {nftList}
}
