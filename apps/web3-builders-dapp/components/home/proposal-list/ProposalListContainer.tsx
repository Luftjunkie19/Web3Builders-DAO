import React from 'react'
import supabase from '@/lib/db/dbConfig'
import ProposalList from './ProposalList';



type Props = {}

async function ProposalListContainer({}: Props) {

const {data:proposals} = await supabase.from(`dao_proposals`).select('*, dao_members!inner(*), dao_vote_options!inner(*), calldata_objects!inner(*)');

  return (
    <div className='max-w-[95rem] w-full mx-auto p-2'>{
      proposals &&
<ProposalList proposals={proposals ?? []}/>
    }
    </div>
  )
}

export default ProposalListContainer