
import React from 'react'
import Comment from './Comment'

type Props<T> = {commentsData: T[], state: 'expanded' | 'collapsed'}

function CommentList<T>({commentsData, state}: Props<T>) {

  return (
    <div className="max-h-[32rem] min-h-96 h-full w-full flex flex-col px-1 py-4 overflow-y-auto gap-2">
      {commentsData.length === 0 && <p className='text-white text-lg text-center'>No comments yet</p>}
   {commentsData && commentsData.length > 0 && commentsData.map((commentObj, index) => <Comment key={index} state={state} commentObj={commentObj} />)}
  </div>
  )
}

export default CommentList