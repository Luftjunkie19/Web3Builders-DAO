import express from 'express';
import { addMember, getMember, getMembers } from '../controllers/MembersController';

const membersRouter = express.Router();

membersRouter.get('/get-all-members', getMembers);

membersRouter.post('/add-member', addMember);

membersRouter.get('/get-member/:discordId', getMember);

export default membersRouter;