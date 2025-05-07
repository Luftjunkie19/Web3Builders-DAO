import { Check, CircleArrowDownIcon, CircleArrowUp, InfoIcon, X } from 'lucide-react'
import React from 'react';
import Link from "next/link";
import { PiHandCoinsFill } from 'react-icons/pi';
import ProposalCallbackItem from './ProposalCallbackItem';

type Props = {}

function ProposalElement({}: Props) {
  return (
    <div  className='bg-zinc-800 border shadow-sm shadow-green-400 flex flex-col border-(--hacker-green-4) max-w-3xl w-full rounded-lg h-96'>
      <div className="w-full border-b border-(--hacker-green-4)">
      <div className="flex justify-between items-center px-3 py-2">
      <div className="flex items-center gap-1 text-white">
        <div className='w-8 h-8 bg-zinc-600 rounded-full'></div>
        <p className='text-sm'>@username</p>
      </div>

<div className="flex items-center gap-2">
<p className=' text-xs  text-white'>🔒 Closed</p>

      <p className='text-(--hacker-green-4) text-xs'>{"Date Passed"}</p>
</div>
    </div>
      </div>
      <Link href={'/proposal/1'} className="w-full h-full px-4 flex flex-col gap-3 py-2 text-white text-sm overflow-x-hidden">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi velit veniam recusandae in soluta voluptatibus consectetur incidunt nesciunt eum itaque autem molestiae, inventore dolores. Rem recusandae vel earum in ipsum mollitia ex vitae nesciunt, veritatis doloribus alias aperiam impedit dolor quod voluptates quis asperiores hic ad ullam fuga, sapiente omnis? Molestias sunt eum, nesciunt similique expedita esse nostrum iste odio numquam perferendis deleniti eos harum amet distinctio alias. Atque, sapiente molestiae laborum beatae in pariatur doloremque, ratione cumque tempore cupiditate sint, suscipit quae ab magnam mollitia corrupti consequatur at aliquam architecto eum libero vero debitis voluptas. Laboriosam dignissimos porro in.</p>
     <div className="w-full flex flex-wrap gap-4 items-center">
      <ProposalCallbackItem icon={CircleArrowUp} callbackText={"1000 Reward For @username"} />
        
     </div>
      </Link>
      <div className="border-t border-(--hacker-green-4) py-3 flex justify-between items-center">
<div className="flex items-center gap-8 px-1 overflow-x-auto">

<div className="flex ml-3 gap-2 items-center">

<div className='w-7 h-7 bg-(--hacker-green-4) rounded-full flex justify-center items-center'>
  <span className='text-xs text-zinc-800'>14</span>
</div>

<button className='flex items-center cursor-pointer gap-1  hover:scale-95 transition-all  text-(--hacker-green-4)'>
    <Check />
    <span className='text-sm'>
    For
    </span>
  </button>

</div>

<div className="flex gap-1 items-center">
<div className='w-7 h-7 bg-red-500 rounded-full flex justify-center items-center'>
  <span className='text-xs text-white'>14</span>
</div>



  <button className='flex items-center cursor-pointer gap-1 hover:scale-95 transition-all  text-red-500'>
  <X/>
  <span className='text-sm'>
    Against
  </span>
  </button>
</div>

<div className="flex gap-2 items-center">
<div className='w-7 h-7  bg-blue-500 rounded-full overflow-hidden flex justify-center items-center'>
  <span className='text-xs text-white'>145</span>
</div>



  <button className='flex items-center cursor-pointer gap-1 hover:scale-95 transition-all  text-blue-500'>
    <InfoIcon/>
    <span className='text-sm'>
      Abstain
    </span>
  </button>
</div>

</div>
      </div>
    </div>
  )
}

export default ProposalElement