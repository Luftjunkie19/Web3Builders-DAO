import ProfilePageContainer from '@/components/profile/container/ProfilePageContainer'
import MemberDetails from '@/components/profile/MemberDetails'
import MemberStats from '@/components/profile/MemberStats'
import MemberTile from '@/components/profile/MemberTile'
import { Button } from '@/components/ui/button'
import supabase from '@/lib/db/dbConfig'
import React from 'react'

type Props = {
  params:{profileId:string}
}

async function Page({params}: Props) {


  const {profileId} = await params;
const {data}=await supabase.from('dao_members').select('*, dao_proposals!inner(*)').eq('userWalletAddress', profileId).single();


  return (
   <>
   {data && <ProfilePageContainer profileData={data} />}
   </>
  )
}

export default Page