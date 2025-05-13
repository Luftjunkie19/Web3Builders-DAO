const winston = require('winston');

export const logger = new winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.json(), winston.format.timestamp()),
    defaultMeta: { service: 'user-service' },
    transports: [
     new winston.transports.Console(),
    ]
});
