const amqp = require('amqplib/callback_api');
const config = require('../config');
const constants = require('../constants');
const Logger = require('../classes/logger');
const logger = new Logger();

class RabbitMQ {
  run() {
    amqp.connect(config.rabbitUrl, (connection_error, connection) => {
      if (connection_error) {
        throw new Error(connection_error);
      }
      connection.createChannel((channel_error, channel) => {
        if (channel_error) {
          throw new Error(channel_error);
        }

        channel.assertQueue(config.logsQueue, {
          durable: true,
        });

        logger.logInfo('Logger is waiting for message');

        channel.consume(
          config.logsQueue,
          messageObject => {
            const { logType, message } = JSON.parse(
              messageObject.content.toString(),
            );

            switch (logType) {
              case constants.logTypes.logs:
                logger.logInfo(message);
                break;
              case constants.logTypes.error:
                logger.logError(message);
                break;
              default:
                logger.logError('Something went wrong. Unknown type of log.');
            }
          },
          {
            noAck: true,
          },
        );
      });
    });
  }
}

module.exports = new RabbitMQ();
