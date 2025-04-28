import React from 'react'
import ProposalElement from '../proposal-item/ProposalElement'
import DropdownBar from './drop-down/DropdownBar'

type Props = {}

function ProposalList({}: Props) {
  return (
    <div className='max-w-[95rem] w-full mx-auto p-2'>
        <p className='text-white text-2xl font-semibold '>List with current proposals</p>
   <DropdownBar/>
<div className="flex flex-col overflow-y-auto items-center gap-6  w-full">
  <ProposalElement/>
  <ProposalElement/>
  <ProposalElement/>
  <ProposalElement/>
  <ProposalElement/>  
</div>
    </div>
  )
}

export default ProposalList