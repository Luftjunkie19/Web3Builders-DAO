import { LucideProps } from 'lucide-react'
import React from 'react'
import { IconType } from 'react-icons/lib'
import { PiHandCoinsFill } from 'react-icons/pi'

type Props = {
    callbackText:string
}

function ProposalCallbackItem({callbackText}: Props) {
  return (
      <div className="max-w-72 w-full h-fit bg-zinc-900 rounded-lg flex items-center gap-4 p-4 text-white">
              <PiHandCoinsFill size={32} className='text-(--hacker-green-4)' />
              <p className='text-sm'>{callbackText}</p>
            </div>
  )
}

export default ProposalCallbackItem