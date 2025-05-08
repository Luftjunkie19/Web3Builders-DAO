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
  
  const {data, dataUpdatedAt, isLoading, isError, isFetched, isFetching, isPaused, isSuccess, isStale} = useReadContract({
    abi:governorContractAbi,
    address: GOVERNOR_CONTRACT_ADDRESS,
    functionName: 'proposals',
    args:["0x76817ee47372b5f395f6344cdf67cfd9662c30d5e983aed36620327763ef3ac4"]
  });

  const {writeContract}=useWriteContract();


  const{data:receipt, dataUpdatedAt:receiptUpdatedAt}=useTransactionReceipt({
    'hash':'0xca2cbc9f47abfc69aa8a46d12a13d4230df5ecaf95ec25e07a1de6495a36bdb6'
  })


//   ## Setting up 1 EVM.
// ==========================
// Simulated On-chain Traces:

//   [4869018] → new GovernmentToken@0x138463d2aB48FfCfAb1558df697CDC3D059F00Fa
//     └─ ← [Return] 21310 bytes of code

//   [4936650] → new CustomBuilderGovernor@0x8CE2aAdFDec2B5008130690DF2568C9Ca8441362
//     └─ ← [Return] 24308 bytes of code


// ==========================

// Chain 17000

// Estimated gas price: 0.022277184 gwei

// Estimated total gas used for script: 13930331

// Estimated amount required: 0.000310328546867904 ETH

// ==========================

// ##### holesky
// ✅  [Success] Hash: 0x5b809e1c1711d8c0bb4077c5b830af6d3d53d2f89fd96c017c9ffb719b595d26
// Contract Address: 0x8CE2aAdFDec2B5008130690DF2568C9Ca8441362
// Block: 3802573
// Paid: 0.00009550439338734 ETH (5389348 gas * 0.017720955 gwei)

                                                                                                                                                                             
// ##### holesky                                                                                                                                                                
// ✅  [Success] Hash: 0x4860077a8d4c39b0064ada03aa1ab93ad66cf7c1945e4636001a992835086a19                                                                                       
// Contract Address: 0x138463d2aB48FfCfAb1558df697CDC3D059F00Fa
// Block: 3802573
// Paid: 0.00009438698084886 ETH (5326292 gas * 0.017720955 gwei)

// ✅ Sequence #1 on holesky | Total Paid: 0.0001898913742362 ETH (10715640 gas * avg 0.017720955 gwei)                                                                         
                                                                                                                                                                             
                                                                                                                                                                             
// ==========================

// ONCHAIN EXECUTION COMPLETE & SUCCESSFUL.

  return (
    <div className='max-w-[95rem] w-full mx-auto p-2'>
        <p className='text-white text-2xl font-semibold '>List with current proposals</p>
   <DropdownBar/>
<div className="flex flex-col overflow-y-auto items-center gap-6  w-full">
<Button onClick={()=>console.log(data)}>Receipt !</Button>

</div>
    </div>
  )
}

export default ProposalList