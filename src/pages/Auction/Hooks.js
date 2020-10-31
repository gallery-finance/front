import {useState, useEffect} from 'react';
import Gallery from '../../web3/abi/Gallery.json'
import FigureSwap from '../../web3/abi/FigureSwap.json'
import {getContract, useActiveWeb3React} from "../../web3";
import {getFigureSwapAddress, getGalleryAddress} from "../../web3/address";
import BigNumber from "bignumber.js";

export const useNFTList = () => {
  const {account, active, library, chainId} = useActiveWeb3React()
  const [nftList, seNFTList] = useState()

  function queryNFTList() {

    try {
      const contract = getContract(library, Gallery.abi, getGalleryAddress(chainId))
      const fixContract = getContract(library, FigureSwap.abi, getFigureSwapAddress(chainId))

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
                  fixContract.methods.cardIds(proposalId, figureId).call().then(cardId =>{
                    console.log('query card id', cardId)
                    if(!(new BigNumber(cardId).isEqualTo('0'))){
                      console.log('query cardIds', cardId)

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
