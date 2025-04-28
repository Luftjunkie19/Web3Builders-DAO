'use client';

import React from 'react'
import { useAccount } from 'wagmi';
type Props = {}

function MemberTile({}: Props) {
const account=useAccount();
  return (
    <div className='max-w-72 w-full bg-zinc-800 rounded-lg flex flex-col gap-3 border border-(--hacker-green-4)
     p-2 items-center
    '>

        <div
        className='w-40
         h-40
          bg-zinc-600 rounded-full 
         '
        >
     
        </div>
        <p className='text-white text-sm'>
            @username
        </p>
        <p className="text-gray-500 text-xs">
            Joined May 2025
        </p>
    </div>
  )
}

export default MemberTile