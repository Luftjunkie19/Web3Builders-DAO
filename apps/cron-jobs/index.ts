const http = require('http');
import express from 'express';

const app = express();
const server = http.createServer(app);


server.listen(2138, () => {
    console.log('Server is running on port 2138');
});


