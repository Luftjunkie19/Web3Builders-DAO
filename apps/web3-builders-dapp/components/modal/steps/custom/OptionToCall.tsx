import { Checkbox } from '@/components/ui/checkbox'
import React from 'react'
import { FieldValues, UseFieldArrayRemove, UseFieldArrayUpdate } from 'react-hook-form'

type Props = {
  index: number,
  removeOption: UseFieldArrayRemove
  updateOption: UseFieldArrayUpdate<FieldValues, "customVotesOptions">

}

function OptionToCall({
  removeOption,
  updateOption
}: Props) {
  return (
   <div className="w-full flex items-center gap-6 h-12 bg-zinc-800">
   <Checkbox  />
     <p className='text-white'>Punish <span className='text-(--hacker-green-4)'>@username</span> with <span className='text-red-500 text-lg font-bold'>250</span> tokens</p>
   </div>
   )
}

export default OptionToCall