import { Router } from "express";
import { activateProposal, cancelProposal, executeProposal, getProposalDetails, getProposalQuorum, getProposalState, getProposalVotes, queueProposal } from "../controllers/GovernanceController";

const governanceRouter = Router();


governanceRouter.post('/activate_proposal/:proposalId', activateProposal);

governanceRouter.post('/queue_proposal/:proposalId', queueProposal);

governanceRouter.post('/cancel_proposal/:proposalId', cancelProposal);

governanceRouter.post('/execute_proposal/:proposalId', executeProposal);

governanceRouter.get('/get_proposal_votes/:proposalId', getProposalVotes);

governanceRouter.get('/get_proposal_state/:proposalId', getProposalState);

governanceRouter.get('/get_proposal_quorum_needed/:proposalId', getProposalQuorum);

governanceRouter.get('/get_proposal_details/:proposalId', getProposalDetails);

export default governanceRouter;