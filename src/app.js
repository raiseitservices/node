'use strict';
const LOGGER = require('./applogger').LOGGER;
const correlator = require('express-correlation-id');
const express = require('express');

LOGGER.info('Application loading...');

const PORT = process.env.API_PORT;
const app = express();
app.listen(PORT, () => {
    LOGGER.info('App listening at http://localhost:${PORT}');
});

app.use(correlator());

// API Request Response logging
app.use(function (req, res, next) {
    LOGGER.info('REQUEST: ' + req.correlationId() + ' ' + req.url);
    res.on('finish', function () {
        //LOGGER.info('Response: ' + Object.keys(res));
        LOGGER.info(correlator.getId() + ' ' + res.statusCode + ' ' + res.statusMessage);
    });
    next();
});

require('./api/testAPI.js')(app);
LOGGER.info('Application ready.');

// --------- DO NOT CHANGE ANYTHING ABOVE THIS LINE ---------
// Sample to add API routes
// require('./api/testAPI.js')(app);
