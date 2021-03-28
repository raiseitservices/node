'use strict';
const LOGGER = require('./applogger').LOGGER;
const correlator = require('express-correlation-id');
const express = require('express');

LOGGER.info('Application loading...');

const PORT = process.env.API_PORT;
const app = express();
app.listen(PORT, () => {
    LOGGER.info('Appurl: http://localhost:${PORT}');
});

app.use(correlator());

// API Request Response logging
app.use(function (req, res, next) {
    LOGGER.info('reqId:' + req.correlationId() + ', url:' + req.url);
    res.on('finish', function () {
        //LOGGER.info('Response: ' + Object.keys(res));
        LOGGER.info('reqId:' + correlator.getId() + ', status:' + res.statusCode + ', statusMsg:' + res.statusMessage);
    });
    next();
});

require('./api/testAPI.js')(app);
LOGGER.info('Application ready.');

// --------- DO NOT CHANGE ANYTHING ABOVE THIS LINE ---------
// Sample to add API routes
// require('./api/testAPI.js')(app);
