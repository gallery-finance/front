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

export async function queryNFTInfo (id){
  try {
    const res = await fetch(`https://raw.github/usercontent.com/gallery-finance/gallery-card/master/${id+1}.json`)
    return await res.json()
  }catch (e){
    return null
  }

}

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
                      const owner = await NFTContract.methods.ownerOf(cardId).call()
                      const uri =  await NFTContract.methods.baseURI().call()
                      console.log('uri:',uri)
                      card.owner = owner
                      card.redeemed = owner.toLocaleString() !== getFigureSwapAddress(chainId)
                      card.points = await fixContract.methods.cardPoints(proposalId, figureId).call()
                      const figure = await contract.methods.figures(figureId).call()
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
                      console.log('figure', card)
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

export const useMyPool = () =>{
  const {active, account, library, chainId} = useActiveWeb3React()
  const [myPool, setMyPool] = useState()

  async function queryMyPool (){
    const contract = getContract(library, EnglishAuctionNFT.abi, getEnglishAuctionNFTAddress(chainId))
    const index = await contract.methods.myCreatedP(account).call()
    console.log('my pool',index)
    if(index > 0){
      const pool = await contract.methods.pools(index-1).call()

      const poolInfo = await queryNFTInfo(index-1)
      pool.title = poolInfo? poolInfo.title: ''
      pool.author = poolInfo && poolInfo.properties && poolInfo.properties.name && poolInfo.properties.name.description? poolInfo.properties.name.description: ''
      pool.image = poolInfo && poolInfo.properties && poolInfo.properties.image && poolInfo.properties.image.description? poolInfo.properties.image.description: ''
      pool.description = poolInfo && poolInfo.properties && poolInfo.properties.description && poolInfo.properties.description.description? poolInfo.properties.description.description: ''

      const date = new Date(pool.closeAt * 1000)
      const now = new Date()
      pool.status = (now - date) > 0? 'live' :'closed'
      pool.index = index-1
      pool.claimed = await contract.methods.creatorClaimedP(index-1).call()
      pool.currentBidder = await contract.methods.currentBidderP(index-1).call()
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


export const useMyBiddenPool = () =>{
  const {active, account, library, chainId} = useActiveWeb3React()
  const [myBiddenPool, setMyBiddenPool] = useState([])

  async function queryMyBiddenPool (){
    const contract = getContract(library, EnglishAuctionNFT.abi, getEnglishAuctionNFTAddress(chainId))

    const count = await contract.methods.getMyBidCount(account).call()
    console.log('my bidden pool',count)
    if(count > 0){
      let pools = []
      for (let i=0; i<count; i++){
        const index = await contract.methods.myBidP(account, i).call()
        console.log('my bidden pool 1',index)

        const pool = await contract.methods.pools(index).call()

        pool.currentPrice = await contract.methods.currentBidderAmount(i).call()
        const bidder = await contract.methods.currentBidderP(i).call()

        pool.isWin = bidder.toLowerCase() === account.toLowerCase()

        const date = new Date(pool.closeAt * 1000)
        const now = new Date()
        pool.status = (date - now) > 0? 'live' :'closed'

        const poolInfo = await queryNFTInfo(i)
        pool.title = poolInfo? poolInfo.title: ''
        pool.author = poolInfo && poolInfo.properties && poolInfo.properties.name && poolInfo.properties.name.description? poolInfo.properties.name.description: ''
        pool.image = poolInfo && poolInfo.properties && poolInfo.properties.image && poolInfo.properties.image.description? poolInfo.properties.image.description: ''
        pool.description = poolInfo && poolInfo.properties && poolInfo.properties.description && poolInfo.properties.description.description? poolInfo.properties.description.description: ''

        pools = pools.concat(pool)
        setMyBiddenPool(pools)
        console.log('pool:',pools)
      }
      // pool.claimed = await contract.methods.creatorClaimedP(index-1).call()
      // pool.claimed = await contract.methods.creatorClaimedP(index-1).call()
      // pool.currentBiddenAmount = await contract.methods.currentBidderAmount1P(index-1).call()

    }
  }

  useEffect(()=>{
    if(active){
      queryMyBiddenPool()
    }
  },[active])

  return {myBiddenPool}

}

export const usePolls = ()=> {
  const {active, account ,library, chainId} = useActiveWeb3React()
  const [pools, setPools] = useState([])

  async function queryPools() {
    const contract = getContract(library, EnglishAuctionNFT.abi, getEnglishAuctionNFTAddress(chainId))
    const NFTContract = getContract(library, ERC721.abi, getGalleryNFTAddress(chainId))

    contract.methods.getPoolCount().call().then( async count =>{
      let poolList = []
      console.log('pool count:',count)
      for (let i = 0; i < count; i++) {
        const id = count - i - 1;
        const pool = await contract.methods.pools(id).call()
        pool.index = id
        pool.isMine = pool.creator.toLowerCase() === account.toLowerCase()
        pool.currentPrice = await contract.methods.currentBidderAmount(id).call()
        const date = new Date(pool.closeAt * 1000)
        const now = new Date()
        pool.status = (date - now) > 0? 'live' :'closed'

        const poolInfo = await queryNFTInfo(id)
        pool.title = poolInfo? poolInfo.title: ''
        pool.author = poolInfo && poolInfo.properties && poolInfo.properties.name && poolInfo.properties.name.description? poolInfo.properties.name.description: ''
        pool.image = poolInfo && poolInfo.properties && poolInfo.properties.image && poolInfo.properties.image.description? poolInfo.properties.image.description: ''
        pool.description = poolInfo && poolInfo.properties && poolInfo.properties.description && poolInfo.properties.description.description? poolInfo.properties.description.description: ''

        console.log('poolInfo',poolInfo)
        poolList = poolList.concat(pool)
        setPools(poolList)
      }
      console.log('pools',poolList)

    })
  }

  useEffect(()=>{
    if(active){
      queryPools()
    }
  },[active])

  return {pools}
}

export const useBiddenStatus = (index)=>{
  const {active, account, library, chainId} = useActiveWeb3React()
  const [bidden, setBidden] = useState(false)
  const [biddenAmount, setBiddenAmount] = useState(0)
  const [winner, setWinner] = useState('')
  const [claimed, setClaimed] = useState(true)



  function queryStatus(){
    try{
      const contract = getContract(library, EnglishAuctionNFT.abi, getEnglishAuctionNFTAddress(chainId))

      contract.methods.currentBidderP(index).call().then(res =>{
        setWinner(res)
      })

      contract.methods.myClaimedP(account, index).call().then(res =>{
        console.log('pool claim:',res)
        setClaimed(res)
      })

      contract.methods.myBidderAmount1P(account, index).call().then(res =>{
        console.log('bidden status',res)
        if(res > 0){
          setBidden(true)
          setBiddenAmount(res)
        }
      })

    }catch (e){

    }
  }

  useEffect(()=>{
    if(active){
      queryStatus()
    }
  },[active])

  return {bidden, biddenAmount, winner, claimed}
}


export const useCreatorStatus = (index, isMine, closed)=>{
  const {active, account, library, chainId} = useActiveWeb3React()
  const [hasWinner, setHasWinner] = useState(false)
  const [creatorClaimed, setCreatorClaimed] = useState(true)


  function queryStatus(){
    try{
      const contract = getContract(library, EnglishAuctionNFT.abi, getEnglishAuctionNFTAddress(chainId))

      contract.methods.currentBidderP(index).call().then(res =>{
        if(res !== '0'){
          console.log('currentBidderP:',res)
          setHasWinner(true)
        }
      })

      contract.methods.creatorClaimedP(index).call().then(res =>{
        console.log('creatorClaimedP:',res)
        setCreatorClaimed(res)
      })

    }catch (e){
      console.log('useCreatorStatus',e)
    }
  }

  useEffect(()=>{
    if(active && isMine && closed){
      queryStatus()
    }
  },[active])

  return {hasWinner, creatorClaimed}
}
