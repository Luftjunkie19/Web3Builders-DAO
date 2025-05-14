import { Request, Response } from "express";

import dotenv from "dotenv";
import { daoContract, proposalStates, provider } from "../config/ethers.config";
import { supabaseConfig } from "../config/supabase";
import { Log, EventLog } from "ethers";

dotenv.config();

const activateProposals = async (req: Request, res: Response) => {
    try{
        
     const lastBlock = await provider.getBlockNumber();
     const filters = daoContract.filters.ProposalCreated();

     const events = await daoContract.queryFilter(filters, lastBlock - 499, lastBlock);

     events.filter(async (event:Log | EventLog) => {
        const state = await daoContract.getProposalState(event.data);
        
       return state === 0;
     }).map(async (event:Log | EventLog) => {
         const tx = await daoContract.activateProposal(event.data);
    
            console.log(tx);
    
            const txReceipt = await tx.wait();
    
            res.send({message:"success", status:200, data:txReceipt, error:null});
     })

     console.log(filters, "Filters");

     console.log(events, "Events");

     res.send({message:"success", status:200, data:events, error:null});
    }
    catch(error){
        console.log(error);
          res.send({message:"error", status:500, data:null, error});
    }
}

const queueProposals = async (req: Request, res: Response) => {
try{
 const lastBlock = await provider.getBlockNumber();
     const filters = daoContract.filters.ProposalActivated();

     const events = await daoContract.queryFilter(filters, lastBlock - 499, lastBlock);

     events.filter(async (event:Log | EventLog) => {
        const state = await daoContract.getProposalState(event.data);
        
       return state === 4;
     }).map(async (event:Log | EventLog) => {
         const tx = await daoContract.activateProposal(event.data);
    
            console.log(tx);
    
            const txReceipt = await tx.wait();
    
            res.send({message:"success", status:200, data:txReceipt, error:null});
     })

            }
    catch(error){
        res.send({message:"error", status:500, data:null, error});
    }
}

const cancelProposal = async (req: Request, res: Response) => {
        try{

            
                // const tx = await daoContract.cancelProposal(proposalId);
    
                // console.log(tx);
    
                // const txReceipt = await tx.wait();
    
                // res.send({message:"success", status:200, data:txReceipt, error:null});
        }
    catch(error){
        res.send({message:"error", status:500, data:null, error});
    }
}

const executeProposals = async (req: Request, res: Response) => {
        try{
 

    // const tx = await daoContract.executeProposal(proposalId);
    
    // console.log(tx);
    
    // const txReceipt = await tx.wait();
    
    // res.send({message:"success", status:200, data:txReceipt, error:null});
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
                res.send({message:"success", status:200, tokenAmount:standardVotes, error:null});
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

            res.send({message:"success", status:200, data:`The proposal (${proposalId}) is ${stateName}`, error:null});
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
    activateProposals,
    queueProposals,
    cancelProposal,
    executeProposals,
    getProposalVotes,
    getProposalState,
    getProposalDetails,
    getProposalQuorum
}