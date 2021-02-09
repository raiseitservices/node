'use strict';
const winston = require('winston');
require('winston-daily-rotate-file');

const logfileTransport = new (winston.transports.DailyRotateFile)({
    filename: process.env.LOGGING_FOLDER + 'applog_%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    handleExceptions: false,
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '15d'
});

const errorlogfileTransport = new (winston.transports.DailyRotateFile)({
    filename: process.env.LOGGING_FOLDER + 'error_%DATE%.log',
    level: 'error',
    datePattern: 'YYYY-MM-DD-HH',
    handleExceptions: true,
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '15d'
});

const LOGGER = winston.createLogger({
    level: process.env.LOGGING_LEVEL,
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        winston.format.json()
    ),
    transports: [
        logfileTransport,
        errorlogfileTransport,
        new (winston.transports.Console)({ 'timestamp': true })
    ]
});

if (process.env.NODE_ENV == 'production') {
    LOGGER.remove(winston.transports.Console);
}

module.exports.LOGGER = LOGGER;
