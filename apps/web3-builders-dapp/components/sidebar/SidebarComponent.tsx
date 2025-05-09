'use client'

import React from 'react'

type Props = {}

import { Calendar, Home, Inbox, Search, Settings, User, UserCog2Icon, UserRoundCheckIcon, UserRoundPenIcon } from "lucide-react"
 
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import ProposalModal from '../modal/ProposalModal'
import { ConnectKitButton } from 'connectkit'
import { useAccount } from 'wagmi'


 function SidebarComponent({}: Props) {

  const {address}=useAccount();

    
    // Menu items.
const items = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Profile",
      url: "/profile/you",
      icon: User,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: UserCog2Icon,
    },
    {
      title: "About Us",
      url: "/about-us",
      icon: User,
    },
   


  ];


  return (
    <>
        <Sidebar>
        <SidebarContent className='text-white flex flex-col justify-between py-16 md:pt-0 bg-zinc-800'>
      
          <SidebarGroup className='flex flex-col gap-2'>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem  key={item.title}>
                    <SidebarMenuButton className='hover:bg-(--hacker-green-4)  transition-all' asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

              </SidebarMenu>
               
                 {address && <ProposalModal>
                  <SidebarMenuButton className='hover:bg-(--hacker-green-4) cursor-pointer  transition-all w-full' asChild>
               <div className='flex items-center gap-2 px-2'>
                      <UserRoundPenIcon />
                      <span>Propose</span>
               </div>
                  </SidebarMenuButton>
                  </ProposalModal>}
             
            </SidebarGroupContent>
          </SidebarGroup>

<div className="md:hidden self-center">
<ConnectKitButton  />
</div>

         
         
        </SidebarContent>
      </Sidebar>
    </>
      )
}

export default SidebarComponent