import { CloudLightningIcon, CoinsIcon, FilePlus2Icon, LucideVote, SmartphoneChargingIcon } from 'lucide-react'
import React from 'react'

type Props = {}

function MemberDetails({}: Props) {
  return (
    <div
    className='
    bg-zinc-800 max-w-3xl w-full rounded-lg flex flex-col gap-3 p-2 border border-(--hacker-green-4)
    h-64
    '    
    >
<div className="
flex items-center gap-2 self-center
">
    <CoinsIcon
    size={42}
    className='text-(--hacker-green-4) 

    '/>
    <span className='text-white text-xl'>
    {"100"} BuilderCoins
    </span>
</div>

<div className="

flex items-center gap-6 justify-center

">
    <div className="
    bg-zinc-900 px-2
    py-6
    text-white rounded-md max-w-1/3 w-full
    flex justify-between
     items-center gap-2 flex-col
    ">

<LucideVote
size={24}
className='
text-(--hacker-green-4)
'
/>

<span className='
text-3xl
font-bold
'>
9
</span>

<span

>
    Votings Participated in
</span>

    </div>


    <div className="
    bg-zinc-900 px-2
    py-6
    text-white rounded-md max-w-1/3 w-full
    flex justify-between
     items-center gap-2 flex-col
    ">

<SmartphoneChargingIcon
size={24}
className='
text-(--hacker-green-4)
'
/>

<span className='
text-3xl
font-bold
'>
    0.35%
</span>

<span className=''>

    Voting Power
</span>

    </div>

    <div className="
      bg-zinc-900 px-2
    py-6
    text-white rounded-md max-w-1/3 w-full
    flex justify-between
     items-center gap-2 flex-col
    ">

<FilePlus2Icon
    
size={24}
className='
text-(--hacker-green-4)
'
/>

<span className='
text-3xl
font-bold
'>
    0
</span>


<span className='
'
>
    Proposals Created
</span>

    </div>
</div>

    </div>
  )
}

export default MemberDetails