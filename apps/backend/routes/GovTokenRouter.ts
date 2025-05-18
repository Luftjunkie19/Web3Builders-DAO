import { Router } from "express";
import { getUserTokenBalance,monthlyTokenDistribution, intialTokenDistribution, punishMember, rewardMember } from "../controllers/GovTokenController";

const govTokenRouter = Router();


govTokenRouter.get('/influence/:dicordMemberId', getUserTokenBalance);

govTokenRouter.get('/monthly_token_distribution', monthlyTokenDistribution);

govTokenRouter.post('/reward_member/:userAddress', rewardMember);

govTokenRouter.post('/punish_member/:userAddress', punishMember);

govTokenRouter.post('/intial_token_distribution/:userAddress', intialTokenDistribution);




export default govTokenRouter;