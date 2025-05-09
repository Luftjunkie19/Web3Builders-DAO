'use client';


import React from 'react';;
import { GOVERNOR_CONTRACT_ADDRESS, governorContractAbi } from '@/contracts/governor/config';
import { useReadContract } from 'wagmi';
import ProposalElementWrapper from './ProposalElementWrapper';

type Props = {
  proposalIndex: number
}

function ProposalElement({
  proposalIndex
}: Props) {
 const {data, dataUpdatedAt, isLoading, isError, isFetched, isFetching, isPaused, isSuccess, isStale} = useReadContract({
    abi:governorContractAbi,
    address: GOVERNOR_CONTRACT_ADDRESS,
    functionName: 'allProposals',
    args:[
      BigInt(Number(proposalIndex))
    ]
  });


  


  return (
<>
{data && <ProposalElementWrapper data={(data as [`0x${string}`, BigInt])[0] as `0x${string}`}/>}
</>
  )
}

export default ProposalElement