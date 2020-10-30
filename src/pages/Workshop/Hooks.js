import React, {useState, useEffect} from 'react';
import Gallery from '../../web3/abi/Gallery.json'
import {getContract, useActiveWeb3React} from "../../web3";
import {getGalleryAddress} from "../../web3/address";
import BigNumber from "bignumber.js";

export const useWorkshopLeftTime = () =>{
    const {active, library, chainId} = useActiveWeb3React()
    const [ leftTime, setLeftTime] = useState()

    function queryLeftTime(){
        try{
            const contract = getContract(library, Gallery.abi, getGalleryAddress(chainId))
            contract.methods.startAt().call().then(res =>{
                console.log('proposal day at:',res)
                const date = new Date(res * 1000 + 9*24*60*60*1000);
                const now = new Date();
                const leftTime = date  - now
                console.log('proposal left time:',res)
                setLeftTime(leftTime)
            })
        }catch (e) {
            console.log('load totalSupply error:',e)

        }
    }

    let timer;
    useEffect(()=>{

        if (active) {
            timer = setInterval(() => {
                queryLeftTime();
            }, (1000));
        } else {
            clearInterval(timer)
        }

        return () => {
            clearInterval(timer)
        }

    },[active])

    return {leftTime}
}

export const useMyVote = () =>{
    const {account, active, library, chainId} = useActiveWeb3React()
    const [ figureRewards, setFigureRewards] = useState()
    const [ proposalRewards, setProposalRewards] = useState()

    const [ myProposalVotes, setMyProposalVotes] = useState()
    const [ myFigureVotes, setMyFigureVotes] = useState()





    useEffect(()=>{
        if(active){
            try{
                const contract = getContract(library, Gallery.abi, getGalleryAddress(chainId))
                contract.methods.myProposalVotes(account).call().then(res =>{
                    console.log('myProposalVotes:',res)
                    setMyProposalVotes(res)
                })
            }catch (e) {
                console.log('myProposalVotes error:',e)

            }

            try{
                const contract = getContract(library, Gallery.abi, getGalleryAddress(chainId))
                contract.methods.myFigureVotes(account).call().then(res =>{
                    console.log('myProposalVotes:',res)
                    setMyFigureVotes(res)
                })
            }catch (e) {
                console.log('myProposalVotes error:',e)

            }

            try{
                const contract = getContract(library, Gallery.abi, getGalleryAddress(chainId))
                contract.methods.myProposalRewards(account).call().then(res =>{
                    console.log('myProposalRewards:',res)
                    setProposalRewards(res)
                })
            }catch (e) {
                console.log('load totalSupply error:',e)

            }

            try{
                const contract = getContract(library, Gallery.abi, getGalleryAddress(chainId))
                contract.methods.myFigureRewards(account).call().then(res =>{
                    console.log('myFigureRewards:',res)
                    setFigureRewards(res)
                })
            }catch (e) {
                console.log('load totalSupply error:',e)

            }

        }
    },[active])

    return {proposalRewards, figureRewards, myProposalVotes, myFigureVotes}
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
                    console.log('myProposalUpdateAt',res)
                    if(res == 0){
                        setRewardsTime(0)
                        return
                    }
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
       const proposalList = await Promise.all(list.map(async item => {

           const proposal = await contract.methods.proposals(item.returnValues.proposalId).call()
           proposal.votes = await contract.methods.proposalVotes(item.returnValues.proposalId).call()
           proposal.id = item.returnValues.proposalId
           return proposal;
       }));

        console.log('proposalList',proposalList)
       proposalList.sort((a, b)=>{

           if (new BigNumber(a.votes).isGreaterThan(b.votes)) {
               return -1;
           } else if (new BigNumber(a.votes).isEqualTo(b.votes)) {
               return 0;
           } else {
               return 1;
           }
       })
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
        const contract = getContract(library, Gallery.abi, getGalleryAddress(chainId))

        const count = await contract.methods.myProposalCount(account).call()
        let idList = []
        for (let i = 0; i < count; i++) {
            idList[i] = count - i - 1;
        }

        console.log('my propasal ids',idList)
        const proposalList = await Promise.all(idList.map(async item => {
            console.log('query my proposal--->',account, item.toString())
            const proposalId = await contract.methods.myProposals(account, item).call()
            const proposal = await contract.methods.proposals(proposalId).call()
            proposal.votes = await contract.methods.proposalVotes(proposalId).call()
            console.log('query my proposal result--->',proposalId, proposal)
            proposal.id = proposalId
            return proposal;
        }));

        setMyProposals(proposalList)
        console.log('my propasal',proposalList)
    }

    useEffect(()=>{
        if(active){
            queryMyProposals()
        }
    }, [active])

    return {myProposals}
}


export const useFigures = () =>{
    const {account, active, library, chainId} = useActiveWeb3React()
    const [figures, setFigures] = useState([])

    async function queryProposals() {
        const contract = getContract(library, Gallery.abi, getGalleryAddress(chainId))
        const list = await contract.getPastEvents('FigureCreated',{ fromBlock: 0, toBlock: "latest" })
        const figureList = await Promise.all(list.map(async item => {

            const figure = await contract.methods.figures(item.returnValues.figureId).call()
            figure.votes = await contract.methods.figureVotes(item.returnValues.figureId).call()
            console.log('figure',item.returnValues)
            figure.info = JSON.parse(figure.info)
            figure.id = item.returnValues.figureId
            return figure;
        }));

        console.log('figureList',figureList)
        figureList.sort((a, b)=>{
            if (new BigNumber(a.votes).isGreaterThan(b.votes)) {
                return -1;
            } else if (new BigNumber(a.votes).isEqualTo(b.votes)) {
                return 0;
            } else {
                return 1;
            }
        })
        setFigures(figureList)
    }

    useEffect(()=>{
        if(active){
            queryProposals()
        }
    }, [active])

    return {figures}
}

export const useMyFigures = () =>{
    const {account, active, library, chainId} = useActiveWeb3React()
    const [myFigures, setMyFigures] = useState([])

    async function queryMyFigures() {
        const contract = getContract(library, Gallery.abi, getGalleryAddress(chainId))

        const count = await contract.methods.myFigureCount(account).call()
        let idList = []
        for (let i = 0; i < count; i++) {
            idList[i] = count - i - 1;
        }
        console.log('figure count',idList)
        const FigureList = await Promise.all(idList.map(async item => {
            const figureId = await contract.methods.myFigures(account, item).call()
            const figure = await contract.methods.figures(figureId).call()
            figure.votes = await contract.methods.figureVotes(figureId).call()
            figure.info = JSON.parse(figure.info)
            console.log('query my proposal result--->',figureId, figure)
            figure.id = figureId
            return figure;
        }));

        setMyFigures(FigureList)
        console.log('my propasal',FigureList)
    }

    useEffect(()=>{
        if(active){
            queryMyFigures()
        }
    }, [active])

    return {myFigures}
}

