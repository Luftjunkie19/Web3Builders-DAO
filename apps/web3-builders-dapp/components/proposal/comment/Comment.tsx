import React from 'react'

type Props = {state: 'expanded' | 'collapsed'}

function Comment({state}: Props) {
  return (
   <div className={`flex flex-col gap-1 p-2 ${state === 'expanded' ? 'bg-zinc-800 lg:bg-zinc-900' : 'bg-zinc-900'}  mx-1 max-w-2xl rounded-lg`}>
    <div className="flex items-center gap-2 p-2">
      <div className="w-10 h-10 bg-zinc-600 rounded-full"></div>
      <div className="flex items-center gap-2">
        <p className='text-white text-sm'>@username, </p>
        <p className='text-(--hacker-green-4) text-xs'>{"Date Passed"}</p>
      </div>
    </div>
      <div className="text-white text-sm px-2">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis cupiditate rerum animi harum at earum. Error nostrum eos porro adipisci!</p>
      </div>
    </div>
  )
}

export default Comment