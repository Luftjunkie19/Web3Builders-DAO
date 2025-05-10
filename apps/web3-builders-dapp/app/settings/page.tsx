import NotificationTile from '@/components/settings/NotificationTile'
import UserProfileTile from '@/components/settings/UserProfileTile'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Bell, Settings2Icon, SettingsIcon, SunMoonIcon } from 'lucide-react'
import React from 'react'

type Props = {}

function Page({}: Props) {
  return (
    <div className='w-full h-full'>
       <div className="mx-auto max-w-4xl w-full flex flex-col gap-4 py-6">

       <p className='text-white text-2xl font-bold flex items-center gap-1'>Settings <SettingsIcon/> </p> 
        
        <div className="flex w-full gap-8 items-center">

<UserProfileTile/>

<NotificationTile/>


        </div>
        
        </div> 
    </div>
  )
}

export default Page