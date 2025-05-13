const http = require('http');
import cors from "cors";
import express from 'express';
import { activateProposalJob, executeProposalJob, queueProposalJob } from './jobs/governor/proposalJobs';
import { monthlyContributionJob } from './jobs/token/governanceTokenJobs';

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);


server.listen(2138, () => {

    console.log('Server is running on port 2138');

    queueProposalJob.start();
    executeProposalJob.start();
    activateProposalJob.start();
    monthlyContributionJob.start();
});


