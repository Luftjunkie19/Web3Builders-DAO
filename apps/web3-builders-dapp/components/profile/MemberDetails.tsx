'use client';

import { GOVERNOR_CONTRACT_ADDRESS, governorContractAbi } from '@/contracts/governor/config';
import { TOKEN_CONTRACT_ADDRESS, tokenContractAbi } from '@/contracts/token/config';
import { CloudLightningIcon, CoinsIcon, FilePlus2Icon, LucideVote, SmartphoneChargingIcon } from 'lucide-react'
import React from 'react'
import { useAccount, useBlockNumber, useReadContract, useReadContracts } from 'wagmi';

type Props = {}

function MemberDetails({}: Props) {

    const {address}=useAccount();
const tokenContractData =   {
    address:TOKEN_CONTRACT_ADDRESS,
    abi:tokenContractAbi
} as const;

const governorContractData= {
    address: GOVERNOR_CONTRACT_ADDRESS,
    abi:governorContractAbi
} as const;

    const {data}=useReadContracts({
        contracts:[
            {
              ...tokenContractData,
                functionName:'balanceOf',
                args:[address]
              },
              {
                ...tokenContractData,
                functionName:'totalSupply',
            
              },{
                ...governorContractData,
                functionName:'userProposals',
                args:[address]
              }
        ]
    })
    

  return (
    <div
    className='
    bg-zinc-800 max-w-3xl w-full rounded-lg flex flex-col gap-3 p-2 border border-(--hacker-green-4)
 min-h-64 
    '    
    >
<div className="
flex items-center gap-2 self-center
">
    <CoinsIcon
    size={42}
    className='text-(--hacker-green-4) 

    '/>
    <span className='text-white text-xl'>
     {Number(Number(data?.[0].result) / 10 ** 18).toFixed(1)} <span className='text-(--hacker-green-4) font-semibold'>BUILD</span>
    </span>
</div>

<div className="flex items-center flex-col md:flex-row gap-6 justify-center">
    
    <div className="bg-zinc-900 px-2 py-6  max-w-64 text-white rounded-md lg:max-w-1/3  w-full flex justify-between items-center gap-2 flex-col">

<LucideVote
size={24}
className='
text-(--hacker-green-4)
'
/>

<span className='
text-3xl
font-bold
'>
9
</span>

<span

>
    Votings Participated in
</span>

    </div>


    <div className="
    bg-zinc-900 px-2
    py-6 max-w-64
    text-white rounded-md lg:max-w-1/3 w-full
    flex justify-between
     items-center gap-2 flex-col
    ">

<SmartphoneChargingIcon
size={24}
className='
text-(--hacker-green-4)
'
/>

<span className='
text-3xl
font-bold
'>
  {(Number(data?.[0].result) / Number(data?.[1].result) * 100).toFixed(2)}%
</span>

<span className=''>

    Voting Power
</span>

    </div>

    <div className="
      bg-zinc-900 px-2
    py-6
    text-white rounded-md lg:max-w-1/3 max-w-64 w-full
    flex justify-between
     items-center gap-2 flex-col
    ">

<FilePlus2Icon
    
size={24}
className='
text-(--hacker-green-4)
'
/>

<span className='
text-3xl
font-bold
'>
    <p onClick={()=>console.log(data?.[2].result)}>Clicked hahaha</p>
</span>


<span className='
'
>
    Proposals Created
</span>

    </div>
</div>

    </div>
  )
}

export default MemberDetails