const amqp = require('amqplib/callback_api');
const config = require('../config');
const constants = require('../constants');
const Mailer = require('./mailer');

class RabbitMQ {
  run() {
    return new Promise((resolve, reject) => {
      amqp.connect(config.rabbitUrl, (error0, connection) => {
        if (error0) {
          reject(error0);
        }
        connection.createChannel((error1, channel) => {
          if (error1) {
            reject(error1);
          }

          this.channel = channel;

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
    this.channel.sendToQueue(
      config.logsQueue,
      Buffer.from(JSON.stringify(message)),
    );
  }
}

module.exports = new RabbitMQ();
