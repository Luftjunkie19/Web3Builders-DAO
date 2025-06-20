'use client';

import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi';
import {useCallback} from 'react';
import { createSupabaseClient } from '@/lib/db/supabaseConfigClient';
import { TokenState, useStore } from '@/lib/zustandConfig';


type Props = {}

function useGetLoggedInUser() {

  const token = useStore((state) => (state as TokenState).token);
  const supabase =  createSupabaseClient(!token ? '' : token);
    const {address}=useAccount();
    const [isLoading, setIsLoading] = useState<boolean>(false);
const [currentUser, setCurrentUser] = useState<any>(null);


const getLoggedInUser= useCallback(async()=>{
  if(address){
  setIsLoading(true);
      const {data, error }=await supabase.from('dao_members').select('*').eq('userWalletAddress', address).single();
      
      if(!data){
        setCurrentUser(null);
        setIsLoading(false);
        return;
      }

      if(error) {
        setCurrentUser(null);
        setIsLoading(false);
        console.log(error);
        return;
      }

  setCurrentUser(data);
  setIsLoading(false);
}
},[address]);


useEffect(()=>{
getLoggedInUser();
},[getLoggedInUser]);

return {currentUser, isLoading};
 
}

export default useGetLoggedInUser