'use client';

import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi';
import {useCallback} from 'react';
import supabase from '@/lib/db/dbConfig';

type Props = {}

function useGetLoggedInUser() {

    const {address}=useAccount();
const [currentUser, setCurrentUser] = useState<any>(null);

const getLoggedInUser= useCallback(async()=>{
if(address){
      const {data, error}=await supabase.from('dao_members').select('*').eq('userWalletAddress', address).single();
      
      if(error) {
        setCurrentUser(null);
        console.log(error);
        return;
      }

  setCurrentUser(data);
}
},[address]);


useEffect(()=>{
getLoggedInUser();
},[getLoggedInUser]);

return {currentUser}
 
}

export default useGetLoggedInUser