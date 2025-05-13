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

const rewardMember = async (req: Request, res: Response) => {
    try {
        const {userAddress} = req.params;

        const {amount} = req.body;
        
        const tx = await governorTokenContract.rewardUser(userAddress, amount);
        
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

const getUserTokens = async (req: Request, res: Response) => {
try {
    const {userAddress} = req.params;

    const userDBObject= await supabaseConfig.from('users').select('*').eq('userAddressWallet',userAddress).single();

    if(!userDBObject.data){
        res.json({message:"error", data:null, error:"user not found", status:500});
    }

    if(userDBObject.error){
         res.json({message:"error", data:null, error:userDBObject.error, status:500});
    }

    const userTokens = await governorTokenContract.getVotes(userAddress);

    res.json({message:`${userDBObject.data.nickname}'s possesses ${userTokens} BUILD Tokens`, data:userTokens, status:200, error:null});
    
} catch (error) {
    console.log(error);
    res.json({data:null, error, message:"error", status:500});
}
}

export {
    intialTokenDistribution,
    punishMember,
    rewardMember,
    getUserTokens
}