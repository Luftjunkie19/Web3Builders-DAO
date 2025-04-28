import { LucideMessageCircle } from 'lucide-react'
import React from 'react'
import CommentList from './CommentList'
import Comment from './Comment'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FaPaperPlane } from 'react-icons/fa'

type Props = {
  state: 'expanded' | 'collapsed'
}

function ProposalCommentBar({state}: Props) {
  return (
<div className={` ${state === 'expanded' ? 'w-full border-0 bg-none lg:max-w-sm lg:border-(--hacker-green-4) lg:bg-zinc-800 ': 'border-none  lg:max-w-sm lg:border-(--hacker-green-4) lg:bg-zinc-800'}   w-full md:flex  h-full lg:max-h-[42rem] rounded-lg border   flex-col justify-between`}>
<div className="flex flex-col gap-1">
<div className="flex items-center gap-2 p-3 text-white">
  <LucideMessageCircle size={32} className='text-(--hacker-green-4)' />
  <p className='text-xl'>Comments</p>
</div>

  <CommentList>
    <Comment state={state}/>
    <Comment state={state}/>
    <Comment state={state}/>
    <Comment state={state}/>
    
  
  </CommentList>

</div>

  <div className="bg-zinc-900 h-16 w-full rounded-b-lg flex items-center border-t border-(--hacker-green-4) px-2">
    <div className="flex w-full justify-between items-center gap-2 px-2">
      <Input placeholder='Write a comment...' className='max-w-sm p-2 w-full bg-zinc-800 rounded-sm border-0 text-white outline-none'/>
    </div>
    <Button className='bg-(--hacker-green-4) hover:bg-(--hacker-green-5) hover:text-white hover:scale-95 transition-all cursor-pointer text-zinc-800'><FaPaperPlane size={40} /></Button>
  </div>
</div>
  )
}

export default ProposalCommentBar