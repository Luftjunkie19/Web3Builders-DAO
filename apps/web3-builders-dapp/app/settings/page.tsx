import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Bell, Settings2Icon, SettingsIcon, SunMoonIcon } from 'lucide-react'
import React from 'react'

type Props = {}

function Page({}: Props) {
  return (
    <div className='w-full h-full'>
       <div className="mx-auto max-w-2xl w-full flex flex-col gap-4 py-6">

       <p className='text-white text-3xl font-bold flex items-center gap-1'>Settings <SettingsIcon/> </p> 
        
        <div className="flex flex-col justify-between max-w-md w-full bg-zinc-800 border border-(--hacker-green-4) self-center h-[36rem] p-4 rounded-md">
          
          <div className="flex flex-col gap-6">
            <p className='text-xl text-white font-semibold flex items-center gap-2'>Theme <SunMoonIcon className='text-(--hacker-green-4)' size={32}/> </p>
         <div className="flex items-center gap-4">
            <p className=' text-white'>Your Current Theme: Dark</p>
            <Switch className='data-[state=checked]:bg-(--hacker-green-4) cursor-pointer  scale-150 data-[state=unchecked]:bg-zinc-600 '/>
         </div>
      

         <p className='text-xl text-white font-semibold flex items-center gap-2'>Notifications <Bell className='text-(--hacker-green-4)' size={32}/> </p>
         <div className="flex items-center justify-between max-w-4/5 w-full gap-4">
            <p className=' text-white'>New Proposals Notification</p>
            <Switch className='data-[state=checked]:bg-(--hacker-green-4) cursor-pointer  scale-150 data-[state=unchecked]:bg-zinc-600 '/>
         </div>
         <div className="flex items-center gap-4 justify-between max-w-4/5 w-full">
            <p className=' text-white'>New Comments Notification</p>
            <Switch className='data-[state=checked]:bg-(--hacker-green-4) cursor-pointer  scale-150 data-[state=unchecked]:bg-zinc-600 '/>
         </div>

         <div className="flex items-center gap-4 justify-between max-w-4/5 w-full">
            <p className=' text-white'>Final Proposal-Voting Notification</p>
            <Switch className='data-[state=checked]:bg-(--hacker-green-4) cursor-pointer  scale-150 data-[state=unchecked]:bg-zinc-600 '/>
         </div>

         <div className="flex items-center gap-4 justify-between max-w-4/5 w-full">
            <p className=' text-white'>Monthly Token Rewards Notification</p>
            <Switch className='data-[state=checked]:bg-(--hacker-green-4) cursor-pointer  scale-150 data-[state=unchecked]:bg-zinc-600 '/>
         </div>

         

         

          </div>
   <Button className='hover:bg-zinc-700 cursor-pointer hover:text-white bg-(--hacker-green-4) text-zinc-800 hover:scale-105 self-end'>Approve</Button>

        </div>
        </div> 
    </div>
  )
}

export default Page