'use client';
import { z } from 'zod';
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { FormProvider, useForm
} from 'react-hook-form'
import { StepContainer } from './steps/Steps';
import {ethers} from 'ethers';

type Props = {children: React.ReactNode}
// Emoji regex — catches most emojis, flags, skin tones, etc.
const emojiRegex = /^[^\p{Emoji_Presentation}\p{Extended_Pictographic}]*$/u;

// new ethers.Interface(
//   'functionrewardUser(address,uint256)'
// ).encodeFunctionData('rewardUser', [address, amount]);

export const proposalObject = z.object({
  title: z.string().min(1),

  shortDescripton: z.string().min(1,{

message: 'Title must be at least 1 character',
}
).max(100,
{
  message: 'Title must be less than 100 characters',
}
).regex(emojiRegex, 'Invalid title,emoji characters found'),
longDescription: z.string().min(1, {
message:'Description must be at least 1 character',
}),

functionsCalldatas:z.array(z.object({
target: z.string().startsWith('0x').length(42,{message:'Invalid address'}),
value: z.bigint(),
calldata: z.string(),
destinationAddress: z.string().startsWith('0x').length(42,{message:'Invalid address'}),
tokenAmount:z.bigint({'message':'Token Amount must be a number'}),
})),

proposalEndTime: z.date({'message':'proposalEndTime must be a date'}),
proposalDelay: z.number({'message':'proposalDelay must be a number'}),
proposalDelayUnit: z.number({'message':'proposalDelayUnit must be a number'}),

urgencyLevel: z.bigint({'message':'urgencyLevel must be a number'}),

isCustom: z.string().min(1,{'message':'The voting type must be selected'}),

customVotesOptions: z.array(z.object({
title: z.string(),
calldataIndicies: z.array(z.number()).optional(),
})).length(5).optional(),

});

import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from '../ui/form';
import { useWriteContract } from 'wagmi';
import { GOVERNOR_CONTRACT_ADDRESS, governorContractAbi } from '@/contracts/governor/config';
import { tokenContractAbi } from '@/contracts/token/config';
import { encodeFunctionData, prepareEncodeFunctionData } from 'viem';
import { toast } from 'sonner';


function ProposalModal({children}: Props) {

const [currentStep, setCurrentStep] = useState<number>(0);
const {writeContract}=useWriteContract({})

const methods = useForm<z.infer<typeof proposalObject>>({
  resolver: zodResolver(proposalObject),
  defaultValues: {
    title: "",
    longDescription: "",
    isCustom: '',
    functionsCalldatas: [],
    urgencyLevel: BigInt(0),
    customVotesOptions: [
      {
        'calldataIndicies':[],
        'title':'',
      },
      {
        'calldataIndicies':[],
        'title':'',
      },
      {
        'calldataIndicies':[],
        'title':'',
      },
      {
        'calldataIndicies':[],
        'title':'',
      },
      {
        'calldataIndicies':[],
        'title':'',
      }
    ]
  }
});

function onSubmit(values: z.infer<typeof proposalObject>) {
  console.log(values);


  const calldataAction = prepareEncodeFunctionData({
    abi: tokenContractAbi,
    functionName: 'transfer',
  })

  const targets= values['functionsCalldatas'].map((item) => item['target']);
  const calldataValues = values['functionsCalldatas'].map((item) => BigInt(item['value']));
  const calldataEndodedBytes = values['functionsCalldatas'].map((item) => {
    const endodedBytes = encodeFunctionData({
     ...calldataAction,
      args: [item['destinationAddress'], BigInt(Number(item['tokenAmount']) * 1e18)],
    });
    return endodedBytes;
  });


 const result = writeContract({
      abi: governorContractAbi,
      address: GOVERNOR_CONTRACT_ADDRESS,
      functionName:'createProposal',
      args:[values['shortDescripton'], targets, calldataValues, calldataEndodedBytes, values['urgencyLevel'], values['isCustom'] === 'standard' ? false : true, BigInt(values['proposalDelay']), BigInt(new Date(values['proposalEndTime']).getTime() / 1000)],
    });
  

    methods.reset();
}


return (
<Dialog>
  <DialogTrigger className='w-full'>
    {children}
  </DialogTrigger>
  <DialogContent className='bg-zinc-800 border border-(--hacker-green-4) drop-shadow-xs shadow-green-400/40'>
    <DialogHeader>
      <DialogTitle className='text-white'>DAO Proposal</DialogTitle>
      <DialogDescription>
        Make a proposal to the DAO, and vote for it to be implemented in the future. 
      </DialogDescription>
    </DialogHeader>

    <FormProvider {...methods}>
<Form {...methods}>
  <form onSubmit={methods.handleSubmit(onSubmit,(err)=>{
    setCurrentStep(0);
    Object.values(err).map((item) => toast(item.message)); 
    console.log(err);
  })}  className='flex flex-col gap-2 w-full'>
<StepContainer currentStep={currentStep}/>



{
  currentStep === 4 &&
  <Button type='submit'  className='hover:bg-(--hacker-green-4) cursor-pointer transition-all duration-500 mt-6 px-6 hover:text-zinc-800 '>
  Propose
</Button>
}


  </form>


</Form>

    </FormProvider>
    <div className="flex flex-col pt-3 gap-4">
<div className="flex gap-3 items-center justify-start
">
{
  currentStep !== 0 && currentStep !== 4 &&
<div className='flex justify-end'>
<Button onClick={() => {
setCurrentStep(currentStep - 1);
}} className='hover:bg-(--hacker-green-4) cursor-pointer transition-all duration-500 
 px-6 hover:text-zinc-800 '>
  Back
</Button>

</div>
}

{
  currentStep !== 4 &&
<div className='flex justify-end'>
<Button onClick={() => {
setCurrentStep(currentStep + 1);
}} className='hover:bg-(--hacker-green-4) cursor-pointer transition-all duration-500 
 px-6 hover:text-zinc-800 '>
  Next
</Button>

</div>
}

</div>



</div>

  </DialogContent>
</Dialog>
  )
}

export default ProposalModal
