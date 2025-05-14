import { daoContract } from "../config/ethers.config";


export const executeGovenorContractEvents=()=>{

        daoContract.on("ProposalCreated", async (proposalId) => {
        console.log("Proposal Created triggered", proposalId);
    // Trigger the web-push notification
    });

    daoContract.on("ProposalActivated", async (args) => {
        console.log("Proposal Activated triggered");
        console.log("Arguments: ", args);
    });

    daoContract.on("ProposalSucceeded", async (args) => {
        console.log("Proposal Succeeded triggered");
        console.log("Arguments: ", args);
    });

    daoContract.on("ProposalCanceled", async (args) => {
        console.log("Proposal Canceled event triggered");
        console.log("Arguments: ", args);
    });
    
    daoContract.on("ProposalQueued", async (args) => {
        console.log("Proposal Queued triggered");
        console.log("Arguments: ", args);
    });
    

    
    daoContract.on("ProposalExecuted", async (args) => {
        console.log("Transfer event triggered");
        console.log("Arguments: ", args);
    });
    
}
