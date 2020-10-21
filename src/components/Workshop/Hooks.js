import React, {useState, useEffect} from 'react';
import Gallery from '../../web3/abi/Gallery.json'
import {getContract, useActiveWeb3React} from "../../web3";
import {getGalleryAddress, getGLFStakingAddress} from "../../web3/address";

export const useProposals = () =>{
    const {account, active, library, chainId} = useActiveWeb3React()
    const [proposals, setProposals] = useState()

    function queryProposals() {
       const contract = getContract(library, Gallery.abi, getGalleryAddress(chainId))
        contract.getPastEvents('ProposalCreated',{ fromBlock: 0, toBlock: "latest" }, (error, res)=>{
            if(!error){
                console.log('queryProposals',res)
            }else {
                console.log('queryProposals error',error)
            }
        })
    }

    useEffect(()=>{
        if(active){
            queryProposals()
        }
    }, [active])

    return {proposals}
}