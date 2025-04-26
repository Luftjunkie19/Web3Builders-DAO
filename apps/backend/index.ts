import { Request, Response } from "express";

const http = require('http');
const express = require('express');
const winston = require('winston');
const app = express();
const server = http.createServer(app);

app.get('/', (req:Request, res:Response) => {
    res.send('Hello World!');
});


const logger = new winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.json(), winston.format.timestamp()),
    defaultMeta: { service: 'user-service' },
    transports: [
     new winston.transports.Console(),
    ],
});
server.listen(2137, () => {
 logger.info('Server is running on port 2137');
});