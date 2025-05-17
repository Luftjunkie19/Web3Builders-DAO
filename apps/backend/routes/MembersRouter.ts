import express from 'express';
import { getMembers } from '../controllers/MembersController';

const membersRouter = express.Router();

membersRouter.get('/get-all-members', getMembers);

export default membersRouter;