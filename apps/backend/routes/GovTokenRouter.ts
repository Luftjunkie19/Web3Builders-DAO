import { Router } from "express";
import { getUserTokenBalance, intialTokenDistribution, punishMember, rewardMember } from "../controllers/GovTokenController";

const govTokenRouter = Router();




govTokenRouter.get('/influence/:userAddress', getUserTokenBalance);

govTokenRouter.post('/reward_member/:userAddress', rewardMember);

govTokenRouter.post('/punish_member/:userAddress', punishMember);

govTokenRouter.post('/intial_token_distribution/:userAddress', intialTokenDistribution);

govTokenRouter.post('/monthly_token_distribution', intialTokenDistribution);



export default govTokenRouter;