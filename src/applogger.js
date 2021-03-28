'use strict';
const winston = require('winston');
require('winston-daily-rotate-file');
const Log2gelf = require('winston-log2gelf');

/*
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

*/

const LOGGER = winston.createLogger({
    level: process.env.LOGGING_LEVEL,
    exitOnError: false,
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        winston.format.json()
    ),
    transports: [
        //logfileTransport,
        //errorlogfileTransport,
        new (winston.transports.Console)({ 'timestamp': true }),
        new Log2gelf({
            level: 'info',
            host: 'localhost',
            port: 12201,
            protocol: 'tls',
            handleExceptions: true, // handle exception within Log2gelf
            exitOnError: true, // exit after exception has been sent
            exitDelay: 1000 // leave Log2gelf 1sec to send the message
        })
    ]
});

/*if (process.env.NODE_ENV == 'production') {
    LOGGER.remove(winston.transports.Console);
}*/

module.exports.LOGGER = LOGGER;
