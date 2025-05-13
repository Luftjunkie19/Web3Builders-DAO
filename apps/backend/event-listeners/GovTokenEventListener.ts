import { governorTokenContract } from "../config/ethers.config";


    // Notify user of events for (Web push notifications, discord, etc.)

export const executeGovenorTokenEvents=()=>{
governorTokenContract.on("UserPunished", async (args) => {
    console.log("User Punished Triggered");
    console.log("Arguments: ", args);
});

governorTokenContract.on("UserRewarded", async (args) => {
    console.log("User Rewarded Triggered");
    console.log("Arguments: ", args);
});

governorTokenContract.on("InitialTokensReceived", async (args) => {
    console.log("Initial Tokens Received Triggered");
    console.log("Arguments: ", args);
});
}