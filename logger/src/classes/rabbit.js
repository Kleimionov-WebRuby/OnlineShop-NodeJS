const amqp = require('amqplib/callback_api');
const config = require('../config');
const logConfig = require('../config/logs-config');
const Logger = require('../classes/logger');
const logger = new Logger();

class RabbitMQ {
  run() {
    amqp.connect(config.rabbitUrl, (error0, connection) => {
      if (error0) {
        throw new Error(error0);
      }
      connection.createChannel((error1, channel) => {
        if (error1) {
          throw new Error(error1);
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
              case logConfig.logTypes.logs:
                logger.logInfo(message);
                break;
              case logConfig.logTypes.error:
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
