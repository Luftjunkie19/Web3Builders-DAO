import { Request, Response } from "express";

const intialTokenDistribution = async (req: Request, res: Response) => {
try {
    const {userAddress} = req.params;
    res.json({userAddress, message:"success", status:200});
    
} catch (error) {
    console.log(error);
    res.json({userAddress:null, error, message:"error", status:500});
}
}

const rewardMember = async (req: Request, res: Response) => {
    try {
        
       
    } catch (error) {
        
    }
}

const getUserTokens = async (req: Request, res: Response) => {
try {
    const {userAddress} = req.params;
    res.json({userAddress, message:"success", status:200});
    
} catch (error) {
    console.log(error);
    res.json({userAddress:null, error, message:"error", status:500});
}
}

export {
    intialTokenDistribution,
    rewardMember,getUserTokens
}