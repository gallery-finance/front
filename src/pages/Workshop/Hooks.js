import React, {useState, useEffect} from 'react';
import Gallery from '../../web3/abi/Gallery.json'
import {getContract, useActiveWeb3React} from "../../web3";
import {getGalleryAddress} from "../../web3/address";

export const useMyVote = () =>{
    const {account, active, library, chainId} = useActiveWeb3React()
    const [ myTotalVote, setMyTotalVote] = useState()

    useEffect(()=>{
        if(active){
            try{
                const contract = getContract(library, Gallery.abi, getGalleryAddress(chainId))
                contract.methods.myProposalVotes(account).call().then(res =>{
                    console.log('bot totalSupply:',res)
                    setMyTotalVote(res)
                })
            }catch (e) {
                console.log('load totalSupply error:',e)

            }

        }
    },[active])

    return {myTotalVote}
}


export const useAccount = () =>{
    const {account, active, library, chainId} = useActiveWeb3React()
    const [ withDrawn, setWithDrawn] = useState()
    const [ claimedTokens, setClaimedTokens] = useState()
    const [ rewardsTime, setRewardsTime] = useState()



    useEffect(()=>{
        if(active){
            try{
                const contract = getContract(library, Gallery.abi, getGalleryAddress(chainId))
                contract.methods.myProposalWithdrawn(account).call().then(res =>{
                    console.log('bot totalSupply:',res)
                    setWithDrawn(res)
                })
            }catch (e) {
                console.log('load totalSupply error:',e)

            }

            try{
                const contract = getContract(library, Gallery.abi, getGalleryAddress(chainId))
                contract.methods.myProposalClaimed(account).call().then(res =>{
                    console.log('bot totalSupply:',res)
                    setClaimedTokens(res)
                })
            }catch (e) {
                console.log('load totalSupply error:',e)

            }

            try{
                const contract = getContract(library, Gallery.abi, getGalleryAddress(chainId))
                contract.methods.myProposalUpdateAt(account).call().then(res =>{

                    const now = new Date();
                    const date = new Date(res * 1000);
                    console.log('rewardsTime:',now-date)
                    const leftTime = 4*24*60*60*1000 - (now - date);
                    console.log('leftTime',leftTime)
                    setRewardsTime(leftTime)
                })
            }catch (e) {
                console.log('load totalSupply error:',e)

            }

        }
    },[active])

    return {withDrawn, claimedTokens, rewardsTime}
}



export const useProposals = () =>{
    const {account, active, library, chainId} = useActiveWeb3React()
    const [proposals, setProposals] = useState([])

   async function queryProposals() {
        const contract = getContract(library, Gallery.abi, getGalleryAddress(chainId))
       const list = await contract.getPastEvents('ProposalCreated',{ fromBlock: 0, toBlock: "latest" })
       console.log('list--->',list[0].returnValues)
       const proposalList = await Promise.all(list.map(async item => {
           console.log('item--->',item)

           const proposal = await contract.methods.proposals(item.returnValues.proposalId).call()
           proposal.votes = await contract.methods.proposalVotes(item.returnValues.proposalId).call()
           proposal.id = item.returnValues.proposalId
           return proposal;
       }));
        console.log('proposal:',proposalList)
       setProposals(proposalList)
    }

    useEffect(()=>{
        if(active){
            queryProposals()
        }
    }, [active])

    return {proposals}
}



export const useMyProposals = () =>{
    const {account, active, library, chainId} = useActiveWeb3React()
    const [myProposals, setMyProposals] = useState([])

    async function queryMyProposals() {
        console.log('my propasal')

        const contract = getContract(library, Gallery.abi, getGalleryAddress(chainId))

        const count = await contract.methods.myProposalCount(account).call()
        console.log('my propasal count',count)

        let idList = []
        for (let i = 0; i < count; i++) {
            idList[i] = count - i - 1;
        }

        console.log('my propasal ids',idList)
        const proposalList = await Promise.all(idList.map(async item => {
            console.log('query my proposal--->',account, item.toString())
            const proposalId = await contract.methods.myProposals(account, 0).call()
            const proposal = await contract.methods.proposals(proposalId).call()
            proposal.votes = await contract.methods.proposalVotes(proposalId).call()
            console.log('query my proposal result--->',proposal)
            proposal.id = proposalId
            return proposal;
        }));

        setMyProposals(proposalList)
        console.log('my propasal',proposalList)
        // const list = await contract.getPastEvents('ProposalCreated',{ fromBlock: 0, toBlock: "latest" })
        // console.log('list--->',list[0].returnValues)
        // const proposalList = await Promise.all(list.map(async item => {
        //     console.log('item--->',item)
        //
        //     const proposal = await contract.methods.proposals(item.returnValues.proposalId).call()
        //     proposal.votes = item.returnValues.votes
        //     proposal.id = item.returnValues.proposalId
        //     return proposal;
        // }));
        // console.log('proposal:',proposalList)
       // setMyProposals(proposalList)
    }

    useEffect(()=>{
        if(active){
            queryMyProposals()
        }
    }, [active])

    return {myProposals}
}
