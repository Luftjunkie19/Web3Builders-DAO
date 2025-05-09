'use client';

import ProposalCallbackItem from '@/components/proposal-item/ProposalCallbackItem'
import ProposalCommentBar from '@/components/proposal/comment/ProposalCommentBar'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'
import useRealtimeDocument from '@/hooks/useRealtimeDocument';
import useRealtimeDocuments from '@/hooks/useRealtimeDocuments';
import { formatDistanceToNow } from 'date-fns';
import React from 'react'
import { FaCheck, FaFlag, FaPaperPlane } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'

type Props<T, U> = {
    proposalData: T,
    commentsData:U[]
}

function ProposalContainer<T, U>({
proposalData, commentsData
}: Props<T, U>) {

    const {objectData:proposalObj}=useRealtimeDocument({'tableName':'dao_proposals', initialObj: proposalData});

    const {serverData}=useRealtimeDocuments({initialData:commentsData,tableName:'dao_voting_comments',parameterOnChanges:'proposal_id'});


    const {state, isMobile}=useSidebar();
  return (
  <>
    <div className={`mx-auto w-full max-w-[90rem] flex flex-col ${state === 'expanded' ? 'sm:flex-col xl:flex-row': 'lg:flex-row'} p-2 gap-6  lg:py-8 justify-between`}>
    
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto ">
    <div className="w-full bg-zinc-800 max-sm:max-h-80 h-full min-h-96 lg:min-h-[28rem] max-h-[32rem] border-(--hacker-green-4) overflow-y-auto  rounded-lg">
    <div className="w-full flex justify-between sticky top-0 left-0 items-center bg-zinc-900 rounded-t-lg px-2 md:px-4 py-8 h-14">
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-full bg-zinc-600"></div>
      <p className='text-(--hacker-green-4)' onClick={()=>console.log(proposalObj)}>@{proposalObj && (proposalObj as any).dao_members.nickname}</p>
    </div>
    
    <div className="flex items-center gap-2">
      <p className='text-white text-sm'>{formatDistanceToNow((proposalObj as any).created_at)}</p>
    </div>
    </div>
    
    <div className="w-full  h-full flex flex-col   justify-between gap-2 py-2 px-2">
      <p className='text-white text-sm'>{(proposalObj as any).proposal_description}</p>
    </div>
    
    </div>
    
    <div className="flex flex-col gap-3 p-2">
      <p className='text-white text-2xl gap-2'><span className='text-(--hacker-green-4)'>@username's </span> Proposal Includes</p>
      <div className={`grid  grid-cols-1 ${state === 'expanded' ? 'sm:grid-cols-2': 'lg:grid-cols-3'}   bg-zinc-800 rounded-lg p-4 gap-4 w-full max-h-48 h-full overflow-y-auto overflow-x-hidden`}>
   {(proposalObj as any).calldata_objects.map((item:any, index:number)=>(<ProposalCallbackItem key={index} callbackText={item.functionDisplayName} />))}

      </div>
    
    
    </div>
    
    <div className="max-w-2xl mx-auto self-center w-full bg-zinc-800 h-12 rounded-lg flex items-center gap-5 overflow-y-hidden justify-between overflow-x-auto p-7">
      <Button className='cursor-pointer transition-all hover:scale-95 hover:bg-(--hacker-green-5) hover:text-white bg-(--hacker-green-4) text-zinc-800'>Vote For <FaCheck /></Button>
      <Button className='cursor-pointer transition-all hover:scale-95 bg-blue-500 hover:bg-blue-400 hover:text-zinc-800'>Abstain <FaFlag /></Button>
      <Button className='cursor-pointer transition-all hover:scale-95 hover:bg-red-400 hover:text-zinc-800 bg-red-500'>Vote Against <MdCancel /></Button>
    </div>
    </div>
    
    
{serverData && proposalObj &&     <ProposalCommentBar proposalId={(proposalObj as any).proposal_id} data={serverData} state={state}/>}
    
    </div>
  
  </>
  )
}

export default ProposalContainer