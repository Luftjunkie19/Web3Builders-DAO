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
values: z.bigint(),
calldata: z.string(),
destinationAddress: z.string().startsWith('0x').length(42,{message:'Invalid address'}),
tokenAmount:z.bigint({'message':'Token Amount must be a number'}),
})),
urgencyLevel: z.bigint({'message':'urgencyLevel must be a number'}),
isCustom: z.boolean(),
customVotesOptions: z.array(z.object({
title: z.string(),
optionId: z.number({'message':'optionId must be a number'}),
calldataIndicies: z.array(z.number()).optional(),
})).length(5).optional()
});

function ProposalModal({children}: Props) {

const [currentStep, setCurrentStep] = useState<number>(0);

const methods = useForm<z.infer<typeof proposalObject>>({
});

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

<StepContainer currentStep={currentStep}/>

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
  currentStep !== 3 &&
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


{
  currentStep === 4 &&
<Button type='submit' className='hover:bg-(--hacker-green-4) cursor-pointer transition-all duration-500  px-6 hover:text-zinc-800 '>
  Propose
</Button>
}
    </FormProvider>

  </DialogContent>
</Dialog>
  )
}

export default ProposalModal
