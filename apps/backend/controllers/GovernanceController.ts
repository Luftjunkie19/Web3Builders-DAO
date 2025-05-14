import { Request, Response } from "express";

import dotenv from "dotenv";
import { daoContract, proposalStates, provider } from "../config/ethers.config";
import { supabaseConfig } from "../config/supabase";
import { EventLog } from "ethers";


export interface ProposalEventArgs extends Omit<EventLog, 'args'> {
    args: string[]
}


dotenv.config();

const activateProposals = async (req: Request, res: Response) => {
    try{
        
     const lastBlock = await provider.getBlockNumber();
     const filters = daoContract.filters.ProposalCreated();

     const events = await daoContract.queryFilter(filters, -499);

events.map( async (event, index) => {
   try{
     const proposal= await daoContract.getProposal((event as ProposalEventArgs).args[0]);

    if(new Date(Number(Number(proposal[3]) * 1000) + Number(proposal[17])).getTime() <= new Date().getTime() && proposal.state === 5){
        const tx = await daoContract.activateProposal((event as ProposalEventArgs).args[0]);
        console.log(tx);

        const txReceipt = await tx.wait();

        res.send({message:"success", status:200, data:txReceipt, error:null});
    }
   }catch(err){
       console.log(err);
       res.send({message:"error", status:500, data:null, error:err});
   }

});

     res.send({message:"success", status:200, data:events, error:null});
    }
    catch(error){
        console.log(error);
          res.send({message:"error", status:500, data:null, error});
    }
}

const finishProposals= async (req: Request, res: Response) => {
    try{
        
     const lastBlock = await provider.getBlockNumber();
     const filters = daoContract.filters.ProposalActivated();

     const events = await daoContract.queryFilter(filters, lastBlock - 499, lastBlock);

     console.log(events);




     events.map(async (event) => {
        const proposal = await daoContract.getProposal((event as ProposalEventArgs).args[0]);
        console.log(proposal);
        if(proposal[6] === 1 && new Date(Number(proposal[4]) * 1000).getTime() <= new Date().getTime()){
            const tx = await daoContract.finishProposal((event as ProposalEventArgs).args[0]);
            console.log(tx);
    
            const txReceipt = await tx.wait();
    
            res.send({message:"success", status:200, data:txReceipt, error:null});
        }
    });
    res.json({data:events, error:null, message:"success", status:200});

    }
     catch(err){
        console.log(err);
     }
    }

const queueProposals = async (req: Request, res: Response) => {
try{
 const lastBlock = await provider.getBlockNumber();
     const filters = daoContract.filters.ProposalSucceeded();

     const events = await daoContract.queryFilter(filters, lastBlock - 499, lastBlock);

     res.json({data:events, error:null, message:"success", status:200});

    //  events.filter(async (event:Log | EventLog) => {
    //     const proposal = await daoContract.getProposal(event.data);
        
    //    return proposal.state === 4;
    //  }).map(async (event:Log | EventLog) => {
    //      const tx = await daoContract.activateProposal(event.data);
    
    //         console.log(tx);
    
    //         const txReceipt = await tx.wait();
    
    //         res.send({message:"success", status:200, data:txReceipt, error:null});
    //  });

            }
    catch(error){
        res.send({message:"error", status:500, data:null, error});
    }
}

const cancelProposal = async (req: Request, res: Response) => {
    const {proposalId} = req.params;
        try{

            
                const tx = await daoContract.cancelProposal(proposalId);
    
                console.log(tx);
    
                const txReceipt = await tx.wait();
    
                res.send({message:"success", status:200, data:txReceipt, error:null});
        }
    catch(error){
        res.send({message:"error", status:500, data:null, error});
    }
}

const executeProposals = async (req: Request, res: Response) => {
        try{

             const lastBlock = await provider.getBlockNumber();
     const filters = daoContract.filters.ProposalQueued(); 
 
 const events = await daoContract.queryFilter(filters, lastBlock - 499, lastBlock);

 console.log(events);

    //  events.filter(async (event:Log | EventLog) => {
    //     const proposal = await daoContract.getProposal(event.data);
        
    //    return proposal.state === 4;
    //  }).map(async (event:Log | EventLog) => {
    //      const tx = await daoContract.executeProposal(event.data);
    
    //         console.log(tx);
    
    //         const txReceipt = await tx.wait();
    
    //         res.send({message:"success", status:200, data:txReceipt, error:null});
    //  });
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
            const proposal = await daoContract.getProposal(proposalId);
            
            const stateName=proposalStates[proposal.state];

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
    finishProposals,
    executeProposals,
    getProposalVotes,
    getProposalState,
    getProposalDetails,
    getProposalQuorum
}