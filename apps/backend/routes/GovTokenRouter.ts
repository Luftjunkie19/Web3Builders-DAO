import { Router } from "express";
import { getUserTokens, intialTokenDistribution, rewardMember } from "../controllers/GovTokenController";

const govTokenRouter = Router();




govTokenRouter.get('/influence/:userAddress', getUserTokens);

govTokenRouter.post('/reward_member/:userAddress', rewardMember);

govTokenRouter.post('/intial_token_distribution/:userAddress', intialTokenDistribution);



export default govTokenRouter;