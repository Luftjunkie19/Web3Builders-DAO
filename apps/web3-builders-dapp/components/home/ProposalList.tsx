'use client';

import React from 'react'
import ProposalElement from '../proposal-item/ProposalElement'
import DropdownBar from './drop-down/DropdownBar'
import { useAccount, useReadContract, useTransactionReceipt, useWriteContract } from 'wagmi'
import { GOVERNOR_CONTRACT_ADDRESS, governorContractAbi } from '@/contracts/governor/config'
import { Button } from '../ui/button';
import { TOKEN_CONTRACT_ADDRESS, tokenContractAbi } from '@/contracts/token/config';

type Props = {}

function ProposalList({}: Props) {

  const {address}=useAccount();
  

  const {data:proposalsCount}=useReadContract({
    abi:governorContractAbi,
    address: GOVERNOR_CONTRACT_ADDRESS,
    functionName: 'proposalCount',
  });


  const proposalDisplay= function () {
   
    return  Array(proposalsCount as number).fill(0).map((_,index)=>(
       <ProposalElement key={index} proposalIndex={index} /> 
    ))
  
    
  }


  const {writeContract}=useWriteContract();



  return (
    <div className='max-w-[95rem] w-full mx-auto p-2'>
        <p className='text-white text-2xl font-semibold '>List with current proposals</p>
   <DropdownBar/>
<div className="flex flex-col overflow-y-auto items-center gap-6  w-full">


<Button
onClick={()=>{
writeContract({
  abi:tokenContractAbi,
  address:TOKEN_CONTRACT_ADDRESS,
  functionName:'handInUserInitialTokens',
  args:[1,1,1,1,1,false]
})
}}
>
  handle In intial tokens
</Button>

{proposalsCount as number && proposalDisplay()}

</div>
    </div>
  )
}

export default ProposalList