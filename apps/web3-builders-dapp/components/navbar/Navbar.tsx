'use client';

import React from 'react'
import { Button } from '../ui/button';


import { useRouter } from 'next/navigation';
import { ConnectKitButton } from 'connectkit';
import { SidebarTrigger } from '../ui/sidebar';
import Link from 'next/link';


type Props = {}

function Navbar({}: Props) {
const router=useRouter();

const redirect_uri = encodeURIComponent('http://localhost:3000');
const scope = encodeURIComponent('identify guilds guilds.members.read messages.read rpc.video.read ');
const discordOAuthURL = `https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}`;

  return (
    <div className='w-full sticky top-0 left-0 h-16 bg-zinc-900 flex p-2 justify-center items-center
    z-[9999]
    '>

<div className="flex  items-center justify-between gap-2 w-full max-w-7xl">
        <Link href={'/'} className=' @min-xs:text-xl lg:text-2xl text-(--hacker-green-4) font-bold'>Web3 Builders DAO</Link>


<div className=" justify-between hidden lg:flex  items-center gap-3">
<Button className='cursor-pointer
 bg-(--hacker-green-4) hover:bg-(--hacker-green-5)
 hover:text-white
 transition-all 
 '

 variant={'secondary'}>Home</Button> 
 <Button className='cursor-pointer
 bg-(--hacker-green-4) hover:bg-(--hacker-green-5)
 hover:text-white
 transition-all 
 ' variant={'secondary'}>Profile</Button>
  <Button 
  className='cursor-pointer
  bg-(--hacker-green-4) hover:bg-(--hacker-green-5)
  hover:text-white
  transition-all 
  '
  variant={'secondary'}>About Us</Button>
</div>

<div className="flex items-end gap-2">
  <div className="hidden md:block">

<ConnectKitButton  />
  </div>
<SidebarTrigger className='hover:bg-(--hacker-green-4) cursor-pointer bg-zinc-800 text-white'/>
</div>
{/* <Button variant='default' onClick={
  ()=>{
    router.replace(
      discordOAuthURL
    );
  }
}
>
Click it !
</Button> */}


</div>


 
    </div>
  )
}

export default Navbar