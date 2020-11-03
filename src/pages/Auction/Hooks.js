import {useState, useEffect} from 'react';
import Gallery from '../../web3/abi/Gallery.json'
import FigureSwap from '../../web3/abi/FigureSwap.json'
import {getContract, useActiveWeb3React} from "../../web3";
import {
  getEnglishAuctionNFTAddress,
  getFigureSwapAddress,
  getGalleryAddress,
  getGalleryNFTAddress
} from "../../web3/address";
import BigNumber from "bignumber.js";
import ERC721 from "../../web3/abi/ERC721.json";
import EnglishAuctionNFT from "../../web3/abi/EnglishAuctionNFT.json";

export const useNFTList = () => {
  const {active, library, chainId} = useActiveWeb3React()
  const [nftList, seNFTList] = useState([])

  function queryNFTList() {

    try {
      const contract = getContract(library, Gallery.abi, getGalleryAddress(chainId))
      const fixContract = getContract(library, FigureSwap.abi, getFigureSwapAddress(chainId))
      const NFTContract = getContract(library, ERC721.abi, getGalleryNFTAddress(chainId))

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
                      card.owner = await NFTContract.methods.ownerOf(cardId).call()
                      card.points = await fixContract.methods.cardPoints(proposalId, figureId).call()
                      const figure = await contract.methods.figures(figureId).call()
                      console.log('figure', figure)
                      const info = JSON.parse(figure.info)
                      card.tokenId = cardId
                      card.name = info.name
                      card.title = info.title
                      card.image = info.image
                      card.description = info.description
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

export const useMyPoll = () =>{
  const {active, account, library, chainId} = useActiveWeb3React()
  const [myPool, setMyPool] = useState()

  async function queryMyPool (){
    const contract = getContract(library, EnglishAuctionNFT.abi, getEnglishAuctionNFTAddress(chainId))
    const index = await contract.methods.myCreatedP(account).call()
    console.log('my pool',index)
    if(index > 0){
      const pool = await contract.methods.pools(index-1).call()
      pool.claimed = await contract.methods.creatorClaimedP(index-1).call()
      pool.claimed = await contract.methods.creatorClaimedP(index-1).call()
      pool.currentBiddenAmount = await contract.methods.currentBidderAmount1P(index-1).call()
      setMyPool(pool)
      console.log('pool:',pool)
    }
  }

  useEffect(()=>{
    if(active){
      queryMyPool()
    }
  },[active])

  return {myPool}

}

export const usePolls = ()=> {
  const {active, library, chainId} = useActiveWeb3React()
  const [pools, setPools] = useState([])

  async function queryPools() {
    const contract = getContract(library, EnglishAuctionNFT.abi, getEnglishAuctionNFTAddress(chainId))
    let poolList = []
    contract.methods.getPoolCount().call().then( async count =>{
      console.log('pool count:',count)
      for (let i = 0; i < count; i++) {
        const id = count - i - 1;
        const pool = await contract.methods.pools(id).call()
        setPools(poolList.concat(pool))
      }
    })
  }

  useEffect(()=>{
    if(active){
      queryPools()
    }
  },[active])

  return {pools}
}
