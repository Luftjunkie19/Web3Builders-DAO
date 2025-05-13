import { Request, Response } from "express";

import dotenv from "dotenv";
import { daoContract } from "../config/ethers.config";

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
        try{}
    catch(error){}
}

const cancelProposal = async (req: Request, res: Response) => {
        try{}
    catch(error){}
}

const executeProposal = async (req: Request, res: Response) => {
        try{}
    catch(error){}
}

const getProposalVotes = async (req: Request, res: Response) => {
        try{}
    catch(error){}
}

const getProposalState = async (req: Request, res: Response) => {
        try{}
    catch(error){}
}

const getProposalQuorum = async (req: Request, res: Response) => {
        try{}
    catch(error){}
}


export {
    activateProposal,
    queueProposal,
    cancelProposal,
    executeProposal,
    getProposalVotes,
    getProposalState,
    getProposalQuorum
}