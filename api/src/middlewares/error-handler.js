const RabbitMQ = require('../classes/rabbit');
const constants = require('../constants');

module.exports = (err, req, res, next) => {
  RabbitMQ.sendToLogger({
    logType: constants.logTypes.error,
    message: `Caught error: ${err.message}.`,
  });
  res.status(err.status ? err.status : 500).send({ message: err.message });
};
