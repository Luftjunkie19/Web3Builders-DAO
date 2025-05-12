import {ethers} from "ethers";
import dotenv from "dotenv";
import { GOVERNOR_CONTRACT_ADDRESS, governorContractAbi } from "../contracts/governor/config";
import { tokenContractAbi } from "../contracts/token/config";

dotenv.config();

export const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);

export const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);

export const daoContract = new ethers.Contract(GOVERNOR_CONTRACT_ADDRESS, governorContractAbi, wallet);

export const governorTokenContract = new ethers.Contract(process.env.TOKEN_CONTRACT_ADDRESS as string, tokenContractAbi, wallet);