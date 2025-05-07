import { Checkbox } from '@/components/ui/checkbox'
import React from 'react'
import { ControllerRenderProps, FieldValues, UseFieldArrayAppend, UseFieldArrayRemove, UseFieldArrayUpdate } from 'react-hook-form'

type Props = {
  index: number,
  customVotesUpdate: UseFieldArrayUpdate<FieldValues, "customVotesOptions">,
  functionToCall: string,
  tokenAmount: number,
  keyIndex: number,
  title: string,
  checkedStatus: boolean,
data: ControllerRenderProps<FieldValues, `customVotesOptions.${number}.calldataIndicies`>,
optionArrayIndices: number[],

}

function OptionToCall({
  data,
  index,
  keyIndex,
  customVotesUpdate,
  functionToCall,
  title,
  tokenAmount,checkedStatus,
  optionArrayIndices
}: Props) {
  return (
   <div  key={index} className="w-full flex items-center gap-6 h-12 bg-zinc-800">
   <Checkbox {...data} value={index} checked={checkedStatus}  onCheckedChange={(value) => {
    console.log(value);
     if(value) {
       customVotesUpdate(keyIndex, {title, calldataIndicies: [...optionArrayIndices, index]});
     }else{
       customVotesUpdate(keyIndex, {title, calldataIndicies: optionArrayIndices.filter((item) => item !== index)});
     }
   }}  />
     <p className='text-white'>{functionToCall}{" "}<span className='text-(--hacker-green-4)'>@username</span> with <span className={`${functionToCall === 'rewardUser(address, uint256)' ? 'text-green-500' : 'text-red-500'} text-lg font-bold`}>{tokenAmount}</span> tokens</p>
   </div>
   )
}

export default OptionToCall