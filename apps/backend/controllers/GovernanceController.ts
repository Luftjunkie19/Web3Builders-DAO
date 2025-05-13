import { Request, Response } from "express";

import dotenv from "dotenv";
import { daoContract, proposalStates } from "../config/ethers.config";

dotenv.config();

const activateProposal = async (req: Request, res: Response) => {
    try{
        const {proposalId} = req.params;
    
        const tx = await daoContract.activateProposal(proposalId);

        console.log(tx);

        const txReceipt = await tx.wait();

        res.send({message:"success", status:200, data:txReceipt});
    }
    catch(error){
        console.log(error);
          res.send({message:"error", status:500, data:null, error});
    }
}

const queueProposal = async (req: Request, res: Response) => {
try{
                const {proposalId} = req.params;
            
                const tx = await daoContract.queueProposal(proposalId);
    
                console.log(tx);
    
                const txReceipt = await tx.wait();
    
                res.send({message:"success", status:200, data:txReceipt, error:null});

            }
    catch(error){
        res.send({message:"error", status:500, data:null, error});
    }
}

const cancelProposal = async (req: Request, res: Response) => {
        try{
                const {proposalId} = req.params;
            
                const tx = await daoContract.cancelProposal(proposalId);
    
                console.log(tx);
    
                const txReceipt = await tx.wait();
    
                res.send({message:"success", status:200, data:txReceipt, error:null});
        }
    catch(error){
        res.send({message:"error", status:500, data:null, error});
    }
}

const executeProposal = async (req: Request, res: Response) => {
        try{
            const {proposalId} = req.params;

    const tx = await daoContract.executeProposal(proposalId);
    
    console.log(tx);
    
    const txReceipt = await tx.wait();
    
    res.send({message:"success", status:200, data:txReceipt, error:null});
        }
    catch(error){
        res.send({message:"error", status:500, data:null, error});
    }
}

const getProposalVotes = async (req: Request, res: Response) => {
        try{
            const {proposalId} = req.params;
            const {isCustom} = req.body;
            if(isCustom){
                const votes = await daoContract.getCustomProposalVotes(proposalId);
                res.send({message:"success", status:200, data:votes, error:null});
            }else{
                const standardVotes = await daoContract.getStandardProposalVotes(proposalId);
                res.send({message:"success", status:200, data:standardVotes, error:null});
            }
        }
    catch(error){
        res.send({message:"error", status:500, data:null, error});
    }
}

const getProposalState = async (req: Request, res: Response) => {
        try{
            const {proposalId} = req.params;
            const state = await daoContract.getProposalState(proposalId);
            
            const stateName=proposalStates[state];

            res.send({message:"success", status:200, data:stateName, error:null});
        }
    catch(error){
        res.send({message:"error", status:500, data:null, error});
    }
}

const getProposalQuorum = async (req: Request, res: Response) => {
        try{
            const {proposalId} = req.params;
            const quorum = await daoContract.getProposalQuorumNeeded(proposalId);
            res.send({message:"success", status:200, data:quorum, error:null});
        }
    catch(error){
        res.send({message:"error", status:500, data:null, error});
    }
}

const getProposalDetails = async (req: Request, res: Response) => {
    try{
        const {proposalId} = req.params;
        const proposalDetails = await daoContract.getProposal(proposalId);
        console.log(proposalDetails);
        res.send({message:"success", status:200, data:proposalDetails, error:null});
    }catch(err){
        res.send({message:"error", status:500, data:null, error:err});
    }
}

export {
    activateProposal,
    queueProposal,
    cancelProposal,
    executeProposal,
    getProposalVotes,
    getProposalState,
    getProposalDetails,
    getProposalQuorum
}