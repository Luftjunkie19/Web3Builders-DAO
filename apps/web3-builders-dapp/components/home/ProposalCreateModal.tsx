'use client';

import React from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Calendar, EllipsisIcon } from 'lucide-react'
import { toast } from 'sonner';
import { useAccount } from 'wagmi';


type Props = {}

function ProposalCard({}: Props) {

  const {address}=useAccount();

  return (
    <>
    <div className="max-w-2xl my-6  drop-shadow-green-500 hover:-translate-y-1 transition-all duration-500 drop-shadow-sm mx-auto rounded-lg flex flex-col gap-2  w-full h-80 bg-zinc-800">
    <div className="flex justify-between items-center px-3 py-2">
      <div className="flex items-center gap-1 text-white">
        <div className='w-8 h-8 bg-zinc-600 rounded-full'></div>
        <p className='text-sm'>@{address ? address : 'Connect your wallet to see your username'}</p>
      </div>

      <p></p>
    </div>
     <div className="px-3 w-full h-full">

      <Textarea placeholder='Enter your proposal' className="h-full  resize-none border-0 outline-0 text-lg text-white"/>
     </div>
    <div className="flex justify-between  items-center pt-2 border-t border-(--hacker-green-4) py-2 w-full gap-2">
      <div className="flex gap-4 items-center ml-4">
<button className='cursor-pointer'>
  <EllipsisIcon className='text-(--hacker-green-4)'/>
</button>
<button className='cursor-pointer'>
  <Calendar className='text-(--hacker-green-4)'/>
</button>
      </div>
      <Button onClick={()=>{
        if(!address){
          toast.error('Please connect your wallet !');
        }
      }} className='hover:bg-(--hacker-green-4) cursor-pointer transition-all duration-500  px-6 hover:text-zinc-800 mr-4'>Propose</Button>
    </div>
    </div>

    </>
  )
}

export default ProposalCard