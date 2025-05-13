import { logger } from "./config/logger";
import {  executeGovenorTokenEvents } from "./event-listeners/GovTokenEventListener";
import { executeGovenorContractEvents } from "./event-listeners/GovenorEventListener";
import govTokenRouter from "./routes/GovTokenRouter";
import governanceRouter from "./routes/GovernanceRouter";
import { Request, Response } from "express";
const fs = require('node:fs');
const path = require('node:path');
const dotenv = require('dotenv');
const http = require('http');
const express = require('express');
const app = express();

app.get('/', (req:Request, res: Response) => {
    res.send('Hello World!');
})



app.use('/governance',governanceRouter);
app.use('/gov_token', govTokenRouter);
const server = http.createServer(app);

dotenv.config();




server.listen(2137, () => {

executeGovenorTokenEvents();
executeGovenorContractEvents();

 logger.info('Server is running on port 2137');
});
