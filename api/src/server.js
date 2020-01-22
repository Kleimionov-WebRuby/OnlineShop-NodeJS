const express = require('express');
const initLoader = require('./loaders');
const config = require('./config');
const RabbitMQ = require('./classes/rabbit');
const logConfig = require('./config/logs-config');

const app = express();

exports.start = () => {
  initLoader(app);
  app.listen(config.port, () => {
    RabbitMQ.sendToLogger({
      logType: logConfig.logTypes.logs,
      message: `Server listening on port ${config.port} | server/api`,
    });
  });
};
