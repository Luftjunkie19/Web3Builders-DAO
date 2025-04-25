import { Check, CircleArrowDownIcon, CircleArrowUp, InfoIcon, X } from 'lucide-react'
import React from 'react';
import Link from "next/link";

type Props = {}

function ProposalElement({}: Props) {
  return (
    <Link href={'/proposal/1'} className='bg-zinc-800 border shadow-sm shadow-green-400 flex flex-col border-(--hacker-green-4) max-w-3xl w-full rounded-lg h-96'>
      <div className="w-full border-b border-(--hacker-green-4)">
      <div className="flex justify-between items-center px-3 py-2">
      <div className="flex items-center gap-1 text-white">
        <div className='w-8 h-8 bg-zinc-600 rounded-full'></div>
        <p className='text-sm'>@username</p>
      </div>

      <p className='text-white text-xs'>{"Date Passed"}</p>
    </div>
      </div>
      <div className="w-full h-full"></div>
      <div className="border-t border-(--hacker-green-4) py-2 flex justify-between items-center">
<div className="flex items-center gap-6">
  <button className='flex items-center cursor-pointer gap-1 ml-5 hover:scale-95 transition-all  text-(--hacker-green-4)'>
    <Check />
    <span className='text-sm'>
    For
    </span>
  </button>

  <button className='flex items-center cursor-pointer gap-1 hover:scale-95 transition-all  text-red-500'>
  <X/>
  <span className='text-sm'>
    Against
  </span>
  </button>

  <button className='flex items-center cursor-pointer gap-1 hover:scale-95 transition-all  text-blue-500'>
    <InfoIcon/>
    <span className='text-sm'>
      Abstain
    </span>
  </button>
</div>
<p className=' text-xs mr-5 text-white'>🔴 Live Voting / 🔒 Voting Closed</p>
      </div>
    </Link>
  )
}

export default ProposalElement