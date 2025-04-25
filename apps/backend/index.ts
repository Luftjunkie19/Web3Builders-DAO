import { Request, Response } from "express";

const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);

app.get('/', (req:Request, res:Response) => {
    res.send('Hello World!');
});



server.listen(3000, () => {
    console.log('Server is running on port 3000');
});