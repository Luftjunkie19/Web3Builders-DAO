import {Contract, ethers} from "ethers";
import dotenv from "dotenv";
import { GOVERNOR_CONTRACT_ADDRESS, governorContractAbi } from "../contracts/governor/config";
import { TOKEN_CONTRACT_ADDRESS, tokenContractAbi } from "../contracts/token/config";

dotenv.config();

export const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);


export const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);

export const getSignerFunc=async()=>{
    return await provider.getSigner(wallet.address);
}

export const governorContractInterface =new ethers.Interface(governorContractAbi);

export const daoContract = new Contract(GOVERNOR_CONTRACT_ADDRESS as `0x${string}`, governorContractInterface, wallet);

export const governorTokenContract = new Contract(TOKEN_CONTRACT_ADDRESS as `0x${string}`, tokenContractAbi, wallet);