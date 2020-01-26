const RabbitMQ = require('../classes/rabbit');
const logConfig = require('../config/logs-config');

module.exports = (err, req, res, next) => {
  RabbitMQ.sendToLogger({
    logType: logConfig.logTypes.error,
    message: `Caught error: ${err.message}.`,
  });
  res.status(err.status ? err.status : 500).send({ message: err.message });
};
