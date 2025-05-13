import { governorTokenContract } from "../config/ethers.config";

governorTokenContract.on("Transfer", (from, to, value) => {
    console.log("Transfer event triggered");
    console.log("From: ", from);
    console.log("To: ", to);
    console.log("Value: ", value);
});