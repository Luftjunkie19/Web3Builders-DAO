import { Request, Response } from "express";
import { governorTokenContract } from "../config/ethers.config";
import { supabaseConfig } from "../config/supabase";


// Single User Action
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

const  getUserTokenBalance = async (req: Request, res: Response) => {
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



// Multiple users actions
const monthlyTokenDistribution = async (req: Request, res: Response) => {
    try {
// [].map(async (userAddress) => {

//     const tx = await governorTokenContract.rewardMonthlyTokenDistribution(BigInt(1),BigInt(1),BigInt(1),BigInt(1),BigInt(1),BigInt(1),BigInt(1), userAddress);
        
//         const txReceipt = await tx.wait();
        
//         console.log(txReceipt);
        
//         res.json({data:txReceipt,error:null, message:"success", status:200});
// });
    res.json({data:null, error:null, message:"success", status:200});
    } catch (error) {
            console.log(error);
    res.json({data:null, error, message:"error", status:500});
    }
}

export {
    intialTokenDistribution,
    punishMember,
    rewardMember,
    getUserTokenBalance,
    monthlyTokenDistribution
}