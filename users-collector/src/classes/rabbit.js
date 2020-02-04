const amqp = require('amqplib/callback_api');
const config = require('../config');

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
