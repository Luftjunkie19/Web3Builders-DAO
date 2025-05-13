import govTokenRouter from "./routes/GovTokenRouter";
import governanceRouter from "./routes/GovernanceRouter";
import { Request, Response } from "express";
const fs = require('node:fs');
const path = require('node:path');
const dotenv = require('dotenv');
const http = require('http');
const express = require('express');
const winston = require('winston');
const app = express();

app.get('/', (req:Request, res: Response) => {
    res.send('Hello World!');
})



app.use('/governance',governanceRouter);
app.use('/gov_token', govTokenRouter);
const server = http.createServer(app);

dotenv.config();

const logger = new winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.json(), winston.format.timestamp()),
    defaultMeta: { service: 'user-service' },
    transports: [
     new winston.transports.Console(),
    ]
});



server.listen(2137, () => {
 logger.info('Server is running on port 2137');
});
