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


 function SidebarComponent({}: Props) {

    
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
   


  ];


  return (
    <>
        <Sidebar>
        <SidebarContent className='text-white flex flex-col justify-between bg-zinc-800'>
      
          <SidebarGroup className='flex flex-col gap-2'>
            <SidebarGroupLabel className='text-xl font-semibold text-(--hacker-green-4)'>Web3 Builders</SidebarGroupLabel>
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
               
                  <ProposalModal>
                  <SidebarMenuButton className='hover:bg-(--hacker-green-4) cursor-pointer  transition-all w-full' asChild>
               <div className='flex items-center gap-2 px-2'>
                      <UserRoundPenIcon />
                      <span>Propose</span>
               </div>
                  </SidebarMenuButton>
                  </ProposalModal>
             
            </SidebarGroupContent>
          </SidebarGroup>


         
        </SidebarContent>
      </Sidebar>
    </>
      )
}

export default SidebarComponent