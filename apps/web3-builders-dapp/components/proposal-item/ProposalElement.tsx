'use client';

import { GOVERNOR_CONTRACT_ADDRESS, governorContractAbi } from '@/contracts/governor/config';
import { Check, CircleArrowUp, InfoIcon, LucideBatteryFull, LucideBatteryLow, LucideBatteryMedium, X } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import ProposalCallbackItem from './ProposalCallbackItem';
import { formatDistanceStrict } from 'date-fns';

import { ethers } from 'ethers';
import Image from 'next/image';
import { toast } from 'sonner';

type Props = {proposalId:`0x${string}`, proposalObj:any}

function ProposalElement<T>({
  proposalId,
  proposalObj
}: Props) {
const {address}=useAccount();

    const {data:fullProposalObject}=useReadContract({
      abi:governorContractAbi,
      address: GOVERNOR_CONTRACT_ADDRESS,
      functionName: 'getProposal',
      args:[proposalId],
    });

    const {data:proposalVotes}=useReadContract({
      abi:governorContractAbi,
      address: GOVERNOR_CONTRACT_ADDRESS,
      functionName: 'getStandardProposalVotes',
      args:[proposalId],
    });

    const {writeContractAsync}=useWriteContract({
        

    })

    const castVote=async (voteOption:number )=>{

        writeContractAsync({
            abi:governorContractAbi,
        address: GOVERNOR_CONTRACT_ADDRESS,
        functionName: 'castVote',
        args:[
            (fullProposalObject as any).id, 
            "Because I like this proposal", 
            address, 
            BigInt(voteOption), 
            ethers.encodeBytes32String(""), 
            (fullProposalObject as any).isCustom, 
            voteOption === 0 ? true : false, 
            voteOption !== 0 ? true : false, 
            []],
        })
    }

    const convertAmountOfTokensToPercent = (amountOfTokens: number) => {


   const allOptionsVote=proposalVotes as BigInt[];

        const totalTokens = allOptionsVote.reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue), 0);
        const percentage = (amountOfTokens / totalTokens) * 100;
        if(isNaN(percentage)){
            return 0;
        }
        return percentage;
    }


    const handleVoteClick = (voteOption: number) => {

   if(fullProposalObject && (fullProposalObject as any).state === 1 && new Date(Number(((fullProposalObject as any).startBlockTimestamp)) * 1000).getTime() <= new Date().getTime()) {
     castVote(voteOption);
return;
    }
        toast.error('You can only vote when the proposal is open for voting.');
    
    
    }


  return (
<>
{fullProposalObject && proposalObj && <div className={`bg-zinc-800 border shadow-sm ${fullProposalObject && (fullProposalObject as any).state === 1 ? 'shadow-green-400' : 'shadow-gray-500'} flex flex-col ${fullProposalObject && (fullProposalObject as any).state === 1 ? 'border-(--hacker-green-4)' : 'border-gray-500'} max-w-3xl  transition-all duration-700 hover:scale-95 hover:-translate-y-1 w-full rounded-lg h-96`}>
      <div className={`w-full border-b ${fullProposalObject && (fullProposalObject as any).state === 1 ? 'border-(--hacker-green-4)' : 'border-gray-500'} `}>
      <div className="flex justify-between items-center px-3 py-2">
      <div onClick={()=>console.log(proposalObj)} className="flex items-center gap-1 text-white">
       {proposalObj && proposalObj.dao_members && proposalObj.dao_members.photoURL ? <Image width={32} height={32} className='w-8 h-8 object-cover rounded-full' src={proposalObj.dao_members.photoURL} alt="" /> : <div className='w-8 h-8 rounded-full object-cover bg-zinc-600'></div>}
        <p className='text-sm'>@{proposalObj && proposalObj.dao_members &&  proposalObj.dao_members.nickname}</p>
      </div>

<div className="flex items-center gap-2">
<p className=' text-xs  text-white'>
  {fullProposalObject as any && (fullProposalObject as any).state === 1 && (fullProposalObject as any) && new Date(Number(((fullProposalObject as any).endBlockTimestamp)) * 1000).getTime() >= new Date().getTime() && '🔓 Open'}
  {fullProposalObject as any && (fullProposalObject as any).state === 2 && '❌ Cancelled'}
  {fullProposalObject as any && (fullProposalObject as any).state === 6 && '🔒 Queued'}
  {fullProposalObject as any && (fullProposalObject as any).state === 4 && '✅ Succeeded'}
</p>

{fullProposalObject && (fullProposalObject as any).state === 0 && fullProposalObject && <p className='text-sm text-white'>
<span className={`${fullProposalObject && new Date(Number(((fullProposalObject as any).startBlockTimestamp)) * 1000).getTime() >= new Date().getTime() ? 'text-(--hacker-green-4)' : 'text-red-700'}   text-xs}`}>  {fullProposalObject as any && `${formatDistanceStrict(new Date(), new Date(Number(((fullProposalObject as any).startBlockTimestamp)) * 1000))}`}</span> 
{new Date(Number(((fullProposalObject as any).startBlockTimestamp)) * 1000).getTime() >= new Date().getTime() ? ' until voting starts' : ' since voting started'}
  </p>}

{fullProposalObject && (fullProposalObject as any).state === 1 &&
      <p className={`${new Date(Number(((fullProposalObject as any).endBlockTimestamp)) * 1000).getTime() >= new Date().getTime() ? 'text-(--hacker-green-4)' : 'text-gray-700'}   text-xs`}>{fullProposalObject as any && `${formatDistanceStrict(new Date(Number(((fullProposalObject as any).endBlockTimestamp)) * 1000), new Date())}`}</p>
}



</div>
    </div>
      </div>
      <Link href={`/proposal/${(fullProposalObject as any).id}`} className="w-full h-full oveflow-y-auto px-4 flex flex-col gap-3 py-2 text-white text-sm overflow-x-hidden">
        <p className=' font-bold text-base'>{(fullProposalObject as any).description} </p>
   
{proposalObj && <p>{proposalObj.proposal_description}</p>}
     <div className="w-full flex flex-wrap gap-4 items-center">
     {proposalObj
     && proposalObj.calldata_objects
     && proposalObj.calldata_objects.map((item:T, index:number)=>(
       <ProposalCallbackItem key={index} callbackText={(item as any).functionDisplayName} />
     ))}
        
     </div>
      </Link>
      <div className="border-t border-(--hacker-green-4) py-3 flex justify-between items-center">
        {!(fullProposalObject as any).isCustom ?
(<div className="flex items-center gap-8 px-1 overflow-x-auto">

<div  className="flex ml-3 gap-2 items-center">
<div className='w-8 h-8 bg-(--hacker-green-4) rounded-full flex justify-center items-center'>
  <span className='text-xs text-zinc-800'>{proposalVotes as BigInt[] && convertAmountOfTokensToPercent(Math.floor(Number((proposalVotes as BigInt[])[0]))).toFixed(0)}%</span>
</div>

<button onClick={()=>handleVoteClick(0)} className='flex items-center cursor-pointer gap-1 hover:scale-95 transition-all text-(--hacker-green-4)'>
    <Check />
    <span className='text-sm'>
    For
    </span>
  </button>

</div>

<div className="flex gap-1 items-center">
<div className='w-8 h-8 bg-red-500 rounded-full flex justify-center items-center'>
  <span className='text-xs text-white'>{proposalVotes as BigInt[] && convertAmountOfTokensToPercent(Math.floor(Number((proposalVotes as BigInt[])[2]))).toFixed(0)}%</span>
</div>



  <button onClick={()=>handleVoteClick(1)} className='flex items-center cursor-pointer gap-1 hover:scale-95 transition-all  text-red-500'>
  <X/>
  <span className='text-sm'>
    Against
  </span>
  </button>
</div>

<div className="flex gap-2 items-center">
<div className='w-8 h-8  bg-blue-500 rounded-full overflow-hidden flex justify-center items-center'>
  <span className='text-xs text-white'>{proposalVotes as BigInt[] && convertAmountOfTokensToPercent(Math.floor(Number((proposalVotes as BigInt[])[1]))).toFixed(0)}%</span>
</div>



  <button onClick={()=>handleVoteClick(2)} className='flex items-center cursor-pointer gap-1 hover:scale-95 transition-all  text-blue-500'>
    <InfoIcon/>
    <span className='text-sm'>
      Abstain
    </span>
  </button>
</div>

</div>) : <div className="flex items-center gap-8 text-sm text-white px-3 overflow-x-auto">
<p>This is a <span className='text-(--hacker-green-4)'>custom</span> proposal, click the proposal content to see options.</p>
</div>
        }

        <div className="flex gap-2 pr-4 items-center">
         <p className='text-sm flex items-center gap-1 text-white'>
Urgency:
           {fullProposalObject && (fullProposalObject as any).urgencyLevel === 0 ? <LucideBatteryLow className=' text-red-500' /> : (fullProposalObject as any).urgencyLevel === 1 ? <LucideBatteryMedium className=' text-yellow-400' />  : <LucideBatteryFull className='text-(--hacker-green-4)' />}
         </p>
        </div>
      </div>
    </div>}
</>);
}

export default ProposalElement