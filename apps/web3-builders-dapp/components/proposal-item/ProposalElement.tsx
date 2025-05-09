import { Check, CircleArrowDownIcon, CircleArrowUp, InfoIcon, X } from 'lucide-react'
import React from 'react';
import Link from "next/link";
import { PiHandCoinsFill } from 'react-icons/pi';
import ProposalCallbackItem from './ProposalCallbackItem';
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
      proposalIndex
    ]
  });


  


  return (
   data as any && <ProposalElementWrapper data={(data as any)[0] as `0x${string}`} />
  )
}

export default ProposalElement