import { AuroraText } from '@/components/magicui/aurora-text'
import { BlurFade } from '@/components/magicui/blur-fade'
import { BorderBeam } from '@/components/magicui/border-beam'
import { SparklesText } from '@/components/magicui/sparkles-text'
import { CanvasRevealEffect } from '@/components/ui/canvas-reveal-effect'
import { Card } from '@/components/ui/card'
import { FocusCards } from '@/components/ui/focus-cards'
import { HeroHighlight } from '@/components/ui/hero-highlight'
import Image from 'next/image'


import React from 'react'

type Props = {}

function Page({}: Props) {
  return (
    <div className="w-full h-full">
      
        <div className=" max-w-6xl w-full mx-auto flex-col gap-6 flex items-center py-6 px-4">

<div className="flex flex-col items-center gap-3">
<BlurFade>
<div className='text-white text-5xl font-bold flex flex-wrap gap-2'>Welcome to <SparklesText sparklesCount={10} colors={{first:'#05F29B', second: '#03A678'}} className='text-5xl font-bold'>
<AuroraText colors={['#2289ff', '#6e2094']}>Web3</AuroraText>Builders DAO
</SparklesText></div>
</BlurFade>

<BlurFade>
  <div className="text-white text-2xl font-medium flex flex-wrap gap-2">A community where Your <AuroraText className='font-bold ' colors={['#05F29B', '#03A678']}>Impact</AuroraText> is proportional to your <AuroraText className='font-bold ' colors={['#05F29B', '#03A678']}>Actions</AuroraText>.</div>
</BlurFade>
        </div>


<div className="flex w-full max-w-6xl my-24 justify-between items-center  gap-24 ">
<BlurFade delay={0.5}>
  <BorderBeam colorFrom='#05F29B' colorTo='#03A678'/>
<Image alt='' className='max-w-sm w-full rounded-lg' src={'/Web3Builders.png'} width={300} height={300}/>
</BlurFade>
<BlurFade delay={0.85}>
  <div className="flex  max-w-xl w-full flex-col gap-5 text-white">
<p className='text-2xl font-bold'>What is <span className='p-2 rounded-lg text-zinc-800 text-animated-first-section'>Web3Builders DAO</span> ?</p>
<p className=' leading-8'>
  Web3Builders DAO is a community, focused on builders, developers, and enthusiasts of Web3, technology, programming and most importantly, <span className='p-2 text-(--hacker-green-4) bg-zinc-800 rounded-lg'>Blockchain</span>. 
</p>
<p className='leading-8'>Our Community's purpose is to create a safe, friendly, relatively small-sized community and welcoming environment for all our members to grow and learn. What should excel us from the rest ? That you can have influence on the server's decision making process.</p>
  </div>
</BlurFade>
</div>

<div className="flex text-white flex-col gap-2">
  <p className='text-3xl font-bold'>The Founders</p>
  <p>Let's introduce the Founders of Web3Builders, the greatest community of developers, builders and enthusiasts of Web3. Real heros and not just sweet-unicorny talkers 🥰</p>
  <FocusCards  cards={[{'title':'Akash Dutta', src:'/founders/Akash.jpg', description:'Founder of Web3Builders, Idea Maker, Web3 Enthusiast'}, {'src':'/founders/luftjunkie-1.jpg', title:'Luftjunkie', description:"Co-Founder of Web3Builders, DAO Creator, Fullstack Blockchain Developer"},{'title':'Arcane', src:'/founders/Arcane-Jose.jpg', description:'CTO of Web3Builders, Senior Blockchain Developer, Web3 Enthusiast'}]}/>
</div>


    </div>
    
    </div>
  )
}

export default Page