import { Router } from "express";
import { getUserTokens, intialTokenDistribution, punishMember, rewardMember } from "../controllers/GovTokenController";

const govTokenRouter = Router();




govTokenRouter.get('/influence/:userAddress', getUserTokens);

govTokenRouter.post('/reward_member/:userAddress', rewardMember);

govTokenRouter.post('/punish_member/:userAddress', punishMember);

govTokenRouter.post('/intial_token_distribution/:userAddress', intialTokenDistribution);



export default govTokenRouter;