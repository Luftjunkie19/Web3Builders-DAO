import { Request, Response } from "express";

const activateProposal = async (req: Request, res: Response) => {}

const queueProposal = async (req: Request, res: Response) => {}

const cancelProposal = async (req: Request, res: Response) => {}

const executeProposal = async (req: Request, res: Response) => {}

const getProposalVotes = async (req: Request, res: Response) => {}

const getProposalState = async (req: Request, res: Response) => {}

const getProposalQuorum = async (req: Request, res: Response) => {}


export {
    activateProposal,
    queueProposal,
    cancelProposal,
    executeProposal,
    getProposalVotes,
    getProposalState,
    getProposalQuorum
}