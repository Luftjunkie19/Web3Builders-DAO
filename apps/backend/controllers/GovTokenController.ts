import { Request, Response } from "express";
import { governorTokenContract } from "../config/ethers.config";
import { error } from "console";
import { supabaseConfig } from "../config/supabase";

const intialTokenDistribution = async (req: Request, res: Response) => {
try {
    const {userAddress} = req.params;
    
    const tx = await governorTokenContract.intialTokenDistribution(userAddress);
    
    const txReceipt = await tx.wait();
    
    console.log(txReceipt);
    
    res.json({data:txReceipt,error:null, message:"success", status:200});

    
} catch (error) {
    console.log(error);
    res.json({data:null, error, message:"error", status:500});
}
}

const calculateMonthlyDeservedAmountOfTokens =  (dailyReports: number, DAOVotingPartcipation:number, DAOProposalsSucceeded: number, problemsSolved: number, issuesReported: number, vcMinutes: number, avgMessagesPerDay: number) => {
      return (dailyReports * 1.25 + DAOVotingPartcipation * 3 + DAOProposalsSucceeded * 1.75 +  problemsSolved * 3 + issuesReported * 1.45 + vcMinutes * 0.1 + Math.floor(avgMessagesPerDay / 10) * 1);
}


const monthlyTokenDistribution = async (req: Request, res: Response) => {
    try {
     

        
        

        // const tx = await governorTokenContract.monthlyTokenDistribution(userAddress);
        
        // const txReceipt = await tx.wait();
        
        // console.log(txReceipt);
        
        // res.json({data:txReceipt,error:null, message:"success", status:200});
       
    } catch (error) {
            console.log(error);
    res.json({data:null, error, message:"error", status:500});
    }
}


const rewardMember = async (req: Request, res: Response) => {
    try {
        const {userAddress} = req.params;

        const {amount} = req.query;
        
        const tx = await governorTokenContract.rewardUser(userAddress, BigInt(Number(amount)));
        
        const txReceipt = await tx.wait();
        
        console.log(txReceipt);
        
        res.json({data:txReceipt,error:null, message:"success", status:200});
       
    } catch (error) {
            console.log(error);
    res.json({data:null, error, message:"error", status:500});
    }
}


const punishMember = async (req: Request, res: Response) => {
    try {
        const {userAddress} = req.params;

        const {amount} = req.body;
        
        const tx = await governorTokenContract.punishMember(userAddress, amount);
        
        const txReceipt = await tx.wait();
        
        console.log(txReceipt);
        
        res.json({data:txReceipt,error:null, message:"success", status:200});
       
    } catch (error) {
            console.log(error);
    res.json({data:null, error, message:"error", status:500});
    }
}

const getUserTokenBalance = async (req: Request, res: Response) => {
try {
    const {userAddress} = req.params;

    const userDBObject= await supabaseConfig.from('dao_members').select('*').eq('userWalletAddress', userAddress).single();

    console.log(userDBObject.data);

    if(!userDBObject.data){
        res.json({message:"error", data:null, error:"The user with provided address does not exist", userAddress , status: 500});
    }

    if(userDBObject.error){
         res.json({message:"error", data:null, error:userDBObject.error,userAddress, status:500});
    }

    const userTokens = await governorTokenContract.getVotes(userAddress);

    res.json({message:`${userDBObject.data.nickname} possesses ${Math.floor(Number(userTokens)/1e18)} BUILD Tokens`, data:Math.floor(Number(userTokens)/1e18), status:200, userAddress, error:null});
    
} catch (error) {
    console.log(error);
    res.json({data:null, error, message:"error", status:500});
}
}

export {
    intialTokenDistribution,
    punishMember,
    rewardMember,
    getUserTokenBalance
}