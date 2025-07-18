import React from 'react'
import ProposalElement from '../proposal-item/ProposalElement'

type Props = {proposals:any[]}

function MemberProposalsCreated({proposals}: Props) {
  return (
    <div className=' flex flex-col w-full items-center gap-4 p-2 mx-auto '>
        {proposals &&

        proposals.map((proposal)=>(<ProposalElement key={proposal.proposal_id} proposalId={proposal.proposal_id} proposalObj={proposal}/>))
        
        }
    </div>
  )
}

export default MemberProposalsCreated