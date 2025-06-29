import React from 'react'
import VotesCard from './votes/VotesCard'
import VotingResultChart from './chart/VotingResultChart'
import { useReadContract } from 'wagmi';
import { GOVERNOR_CONTRACT_ADDRESS, governorContractAbi } from '@/contracts/governor/config';
import { FaCheckCircle, FaDiceFive, FaDiceFour, FaDiceOne, FaDiceThree, FaDiceTwo, FaHandHolding } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';

type Props = {proposalId: `0x${string}`, isCustom: boolean};

function VotingDataContainer({proposalId, isCustom}: Props) {

    const {data:proposalVotes}=useReadContract({
      abi: governorContractAbi,
      address: GOVERNOR_CONTRACT_ADDRESS,
      functionName: "getProposalVotes",
      args:[proposalId],
    });
  


  return (
  <div className='w-full  flex flex-col gap-2 px-4'>
  <p className='text-white text-xl font-bold'>Proposal Statistics/Data</p>
  
  <div className="w-full flex flex-col lg:flex-row py-2 h-full  gap-8">
{proposalVotes && (proposalVotes as any[]) !== undefined ? <>
<VotesCard proposalVotes={proposalVotes as any[]} />



<VotingResultChart isCustom={isCustom} chartData={isCustom ? [
   {voteOption: 'Option 1', 
    value: (proposalVotes as any[]).filter((vote) => Number(vote.voteOption) === 0).reduce((acc, vote) => acc + Number(vote.weight) / 1e18, 0),
    fill: '#f6cd00', icon: FaDiceOne
   },
    {voteOption: 'Option 2', value: (proposalVotes as any[]).filter((vote) => Number(vote.voteOption) === 1).reduce((acc, vote) => acc + Number(vote.weight) / 1e18, 0), 
    fill: '#00e660', icon: FaDiceTwo
    },
    {voteOption: 'Option 3', value: (proposalVotes as any[]).filter((vote) => Number(vote.voteOption) === 2).reduce((acc, vote) => acc + Number(vote.weight) / 1e18, 0), 
    fill: '#006aff', icon: FaDiceThree
    },
    {voteOption: 'Option 4', value: (proposalVotes as any[]).filter((vote) => Number(vote.voteOption) === 3).reduce((acc, vote) => acc + Number(vote.weight) / 1e18, 0), fill: '#ff00a1', icon: FaDiceFour},
    {voteOption: 'Option 5', value: (proposalVotes as any[]).filter((vote) => Number(vote.voteOption) === 4).reduce((acc, vote) => acc + Number(vote.weight) / 1e18, 0), fill: '#59008c', icon: FaDiceFive},
] : [
  {voteOption: 'Approve', isFor: true, isAbstain:false, isDefeat:false, value: (proposalVotes as any[]).filter((vote) => Number(vote.voteOption) === 0).reduce((acc, vote) => acc + Number(vote.weight) / 1e18, 0),
    fill: '#00e660', icon: FaCheckCircle

  },
   {voteOption: 'Abstain', isFor: false, isAbstain:true, isDefeat:false,  value: (proposalVotes as any[]).filter((vote) => Number(vote.voteOption) === 1).reduce((acc, vote) => acc + Number(vote.weight) / 1e18, 0), 
    fill: '#0080ff', icon: FaHandHolding
   },
   {voteOption: 'Defeat', isFor: false, isAbstain:false, isDefeat:true,  value: (proposalVotes as any[]).filter((vote) => Number(vote.voteOption) === 2).reduce((acc, vote) => acc + Number(vote.weight) / 1e18, 0), 
    fill: '#ff0000', icon: MdCancel
   },
] }/>
</> : <></>}

  </div>
  </div>
  )
}

export default VotingDataContainer