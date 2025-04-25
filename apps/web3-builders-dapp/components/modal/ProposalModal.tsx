import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type Props = {children: React.ReactNode}

function ProposalModal({children}: Props) {
  return (
<Dialog>
  <DialogTrigger className='w-full'>
    {children}
  </DialogTrigger>
  <DialogContent className='bg-zinc-800 border border-(--hacker-green-4) drop-shadow-xs shadow-green-400/40'>
    <DialogHeader>
      <DialogTitle className='text-white'>DAO Proposal</DialogTitle>
      <DialogDescription>
        Make a proposal to the DAO, and vote for it to be implemented in the future. 
      </DialogDescription>
    </DialogHeader>

  <div className="flex flex-col gap-1">
  <Label htmlFor="title" className='text-white text-base font-light'>Title</Label>
  <Input id='title' placeholder='Enter your proposal title'
    className='text-white border border-(--hacker-green-4) outline-none '/>
  </div>

  <div className="flex flex-col gap-1">
  <Label htmlFor="proposal-type" className='text-white text-base font-light'>Proposal Type</Label>
  <Select>
  <SelectTrigger className="w-full text-white border border-(--hacker-green-4)">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent className='bg-zinc-800 border border-(--hacker-green-4)'>
    <SelectItem className='text-white' value="reward">Reward User(s)</SelectItem>
    <SelectItem className='text-white' value="directional">Server Direction</SelectItem>
    <SelectItem className='text-white' value="proposal">Proposal</SelectItem>
  </SelectContent>
</Select>
  </div>

  <div className="flex flex-col gap-1">
  <Label htmlFor="textarea" className='text-white text-base font-light'>Description</Label>
  <Textarea id='textarea'  className='text-white border border-(--hacker-green-4) outline-none resize-none
  h-28
  '
  placeholder='Enter your proposal description...'
  />  
  </div>


<Button className='hover:bg-(--hacker-green-4) cursor-pointer transition-all duration-500  px-6 hover:text-zinc-800 '>
  Propose
</Button>
  </DialogContent>
</Dialog>
  )
}

export default ProposalModal