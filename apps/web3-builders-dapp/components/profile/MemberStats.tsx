import React from 'react'

type Props = {}

function MemberStats({}: Props) {
  return (
    <div className='max-w-[97.5rem] w-full mx-auto'>

<div className="flex flex-col gap-1">
<p className='text-white text-2xl font-semibold'>Member's Statistics </p>
<p className='text-gray-500 text-sm'> Here's a summary of your stats in the DAO so far.</p>
</div>

<div className="flex gap-4 w-full items-center justify-center py-2">

<div className="bg-zinc-800 p-6 flex justify-center text-white border border-(--hacker-green-4) items-center rounded-lg max-w-sm h-80 w-full">
    {"Place for a chart"}
</div>

<div className="bg-zinc-800 p-6 flex justify-center text-white border-(--hacker-green-4) border items-center rounded-lg max-w-2xl h-80 w-full">
    {"Place for a chart"}
</div>



</div>

    </div>
  )
}

export default MemberStats