'use client';
import React from 'react'
import { Button } from '../ui/button'
import useGetLoggedInUser from '@/hooks/useGetLoggedInUser';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useWriteContract } from 'wagmi';
import { TOKEN_CONTRACT_ADDRESS, tokenContractAbi } from '@/contracts/token/config';
type Props = {}

function DeleteAccount({}: Props) {
const router= useRouter();
const {currentUser}=useGetLoggedInUser();
const {writeContract, status}=useWriteContract();


    const handleDeleteAccount=async ()=>{
try{
    if(!currentUser.discord_member_id){
        toast.success('You are not logged in or no such user in DB !');
        return;
    }
      const fetchDelete=await fetch(`http://localhost:2137/gov_token/influence/remove/${currentUser.discord_member_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          'x-backend-eligibility': process.env.NEXT_PUBLIC_FRONTEND_ACCESS_SECRET as string,
          'authorization': `Bearer ${currentUser.discord_member_id}`
        },
    });

    console.log(fetchDelete);

    const res=await fetchDelete.json();
    console.log(res);

    if(res.error && res.error.code && res.error.shortMessage){
        toast.error(`${res.error.code}: ${res.error.shortMessage}`);
    }

    if(res.error && res.error.message){
        toast.error(`${res.error.message}`);
    }

    if(typeof res.error === 'string'){
        toast.error(`${res.error}`);
    }

    if(res.data){
        toast.success('Account deleted successfully !');
      router.push('/');
    }


}catch(err){
    console.log(err);
}

    }

    const leaveDAO=()=>{
      writeContract({
        abi:tokenContractAbi,
        address: TOKEN_CONTRACT_ADDRESS,
        functionName: 'leaveDAO',
        args: [currentUser.userWalletAddress],
      });

      status ==='success' && toast.success('You have left the DAO !');

      status === 'error' && toast.error('Error leaving the DAO !');
    };



  return (
    <div className='flex flex-col text-white gap-2'>
<div className="">
  <p className='text-base font-bold'>Leave DAO</p>
  <p className='text-xs'>If you're no longer enjoying DAO or doesn't enjoy the community, you can leave the DAO, but still be pertained in DB in case you'd like to return.</p>
<Button
      onClick={leaveDAO}
      className='cursor-pointer hover:scale-95 bg-yellow-300 hover:bg-yellow-500 text-black'>
        Leave DAO
      </Button>
</div>


      <div className="">
          <p className='text-base font-bold
        '>Delete Account</p>
        <p className='text-xs'>If you are no longer willing to participate in our DAO, you can delete your account.</p>
      </div>

      <Button
      onClick={handleDeleteAccount}
      className='cursor-pointer hover:scale-95 bg-red-500 hover:bg-red-700 text-white'>
        Delete
      </Button>
    </div>
  )
}

export default DeleteAccount