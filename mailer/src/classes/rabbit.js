const amqp = require('amqplib/callback_api');
const config = require('../config');
const constants = require('../constants');
const Mailer = require('./mailer');

class RabbitMQ {
  run() {
    return new Promise((resolve, reject) => {
      amqp.connect(config.rabbitUrl, (connection_error, connection) => {
        if (connection_error) {
          reject(connection_error);
        }
        connection.createChannel((channel_error, channel) => {
          if (channel_error) {
            reject(channel_error);
          }

          this._channel = channel;

          channel.assertQueue(config.logsQueue, {
            durable: true,
          });
          channel.assertQueue(config.mailerQueue, {
            durable: true,
          });

          this.sendToLogger({
            logType: constants.logTypes.logs,
            message: 'Mailer is waiting for message',
          });

          channel.consume(
            config.mailerQueue,
            messageObject => {
              const { receiver, message } = JSON.parse(
                messageObject.content.toString(),
              );

              Mailer.sendMail(message, receiver)
                .then(() => {
                  this.sendToLogger({
                    logType: constants.logTypes.logs,
                    message: `Message to ${receiver} was send successfully`,
                  });
                })
                .catch(error => {
                  this.sendToLogger({
                    logType: constants.logTypes.error,
                    message: `Mailer get error: ${error}`,
                  });
                });
            },
            {
              noAck: true,
            },
          );

          resolve();
        });
      });
    });
  }

  sendToLogger(message) {
    this._channel.sendToQueue(
      config.logsQueue,
      Buffer.from(JSON.stringify(message)),
    );
  }
}

module.exports = new RabbitMQ();
