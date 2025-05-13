import { Router } from "express";
import { activateProposals, cancelProposals, executeProposals, getProposalDetails, getProposalQuorum, getProposalState, getProposalVotes, queueProposals } from "../controllers/GovernanceController";

const governanceRouter = Router();


governanceRouter.get('/activate_proposals', activateProposals);

governanceRouter.get('/queue_proposals', queueProposals);

governanceRouter.get('/cancel_proposals', cancelProposals);

governanceRouter.get('/execute_proposals', executeProposals);

governanceRouter.get('/get_proposal_votes/:proposalId', getProposalVotes);

governanceRouter.get('/get_proposal_state/:proposalId', getProposalState);

governanceRouter.get('/get_proposal_quorum_needed/:proposalId', getProposalQuorum);

governanceRouter.get('/get_proposal_details/:proposalId', getProposalDetails);

export default governanceRouter;