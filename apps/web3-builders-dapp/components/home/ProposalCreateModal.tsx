'use client';

import React from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Calendar, EllipsisIcon } from 'lucide-react'
import { useAccount, useWriteContract } from 'wagmi';
import useGetLoggedInUser from '@/hooks/useGetLoggedInUser';
import {useLottie} from "lottie-react";
import cryptoLottieAnimation from "@/public/gifs/Crypto-Lottie-Animation.json";
import Image from 'next/image';
import { Skeleton } from '../ui/skeleton';
import Link from 'next/link';
import { FaDiscord } from 'react-icons/fa';


type Props = {}

function ProposalCard({}: Props) {

  const {address}=useAccount();
  const {currentUser, isLoading}=useGetLoggedInUser();

  const options = {
    animationData: cryptoLottieAnimation,
    loop: true
  };

  const { View } = useLottie(options);



  return (
    <div className={`w-full h-full px-2  ${(address && !currentUser && !isLoading) ? 'flex flex-col gap-6 justify-center items-center h-screen' : 'h-full'}`}>
{address && currentUser && !isLoading ?    <div className="max-w-2xl my-6  drop-shadow-green-500 hover:-translate-y-1 transition-all duration-500 drop-shadow-sm mx-auto rounded-lg flex flex-col gap-2  w-full h-80 bg-zinc-800">
    <div className="flex justify-between items-center px-3 py-2 border-b border-(--hacker-green-4)">
      <div className="flex items-center gap-1 text-white">
        <div className='w-8 h-8 bg-zinc-600 rounded-full'>
          {currentUser && currentUser.photoURL && <Image alt={currentUser.nickname} src={currentUser.photoURL} width={32} height={32} className='rounded-full w-full h-full'/>}
        </div>
        <p className={`text-sm ${currentUser ? 'text-(--hacker-green-4)' : 'text-zinc-600'}`}>@{currentUser ? currentUser.nickname : 'Connect your wallet to see your username'}</p>
      </div>

      <p></p>
    </div>
     <div className="px-3 w-full h-full">

      <Textarea placeholder='Enter your proposal' className="h-full  resize-none border-0 outline-0 text-lg text-white"/>
     </div>
    <div className="flex justify-between  items-center pt-2 border-t border-(--hacker-green-4) py-2 w-full gap-2">
      <div className="flex gap-4 items-center ml-4">
<button className='cursor-pointer'>
  <EllipsisIcon className='text-(--hacker-green-4)'/>
</button>
<button className='cursor-pointer'>
  <Calendar className='text-(--hacker-green-4)'/>
</button>
      </div>
      <Button
   
      className='hover:bg-(--hacker-green-4) cursor-pointer transition-all duration-500  px-6 hover:text-zinc-800 mr-4'>Propose</Button>
    </div>
    </div> : isLoading && <Skeleton className='max-w-2xl my-6  drop-shadow-green-500 hover:-translate-y-1 transition-all duration-500 drop-shadow-sm mx-auto rounded-lg flex flex-col gap-2  w-full h-96 bg-zinc-800'>

<div className="w-full p-2 h-12 flex items-center gap-2 border-b-(--hacker-green-4) border-b">
  <Skeleton className='w-8 h-8 rounded-full bg-gray-400'/>
  <Skeleton className='w-32 h-4'/>
</div>

<Skeleton className='px-4 py-2 h-full'/>

<div className="flex justify-between  items-center pt-2 border-t border-(--hacker-green-4) py-2 w-full gap-2">

  <div className="flex gap-4 items-center ml-4">
  <Skeleton className='w-8 h-8 rounded-full bg-gray-400'/>
  <Skeleton className='w-8 h-8 rounded-full bg-gray-400'/>
  </div>

<Skeleton className='w-24 h-8 rounded-lg bg-gray-400'/>
</div>

    </Skeleton> }

    {address && !currentUser && !isLoading && <div className='flex flex-col gap-8 items-center w-full h-screen justify-center p-2'>

<p className='text-white text-3xl font-semibold text-center'>You are not a member of our Discord Community and DAO member yet !</p>


<div className="flex justify-center items-center max-w-md w-full h-80 my-6">
{View && View}
</div>


<div className="flex flex-col gap-2 items-center justify-center max-w-2xl w-full text-center">
<p className='text-white text-lg'>If you want to participate in our DAO and you're a <span className='text-(--hacker-green-4)'>Web3 Builder</span>, you would need to belong to our <span className='text-(--discord-colour)'>Discord Community</span> and register your wallet address to claim the tokens.</p>
<Link target='_blank' className='bg-(--discord-colour) hover:bg-gray-600 transition-all duration-500 hover:scale-95 rounded-lg flex items-center gap-2 text-white p-2' href={`https://discord.gg/ZRVt9F7s`}>Join Discord Now <FaDiscord className='text-white text-3xl'/></Link>
</div>

    
    </div>}


    </div>
  )
}

export default ProposalCard