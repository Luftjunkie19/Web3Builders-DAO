import { daoContract } from "../config/ethers.config";


export const executeGovenorContractEvents=()=>{
    daoContract.on("ProposalCanceled", async (args) => {
        console.log("Proposal Canceled event triggered");
        console.log("Arguments: ", args);
    });
    
    daoContract.on("ProposalQueued", async (args) => {
        console.log("Transfer event triggered");
        console.log("Arguments: ", args);
    });
    
    daoContract.on("ProposalCreated", async (args) => {
        console.log("Transfer event triggered");
        console.log("Arguments: ", args);
    });
    
    daoContract.on("ProposalExecuted", async (args) => {
        console.log("Transfer event triggered");
        console.log("Arguments: ", args);
    });
    
}
