import React from 'react'

type Props = {children: React.ReactNode}

function CommentList({children}: Props) {
  return (
    <div className="max-h-[32rem] h-full w-full flex flex-col px-1 py-4 overflow-y-auto gap-2">
 {children}
  </div>
  )
}

export default CommentList