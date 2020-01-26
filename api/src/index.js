const database = require('./database');
const initModels = require('./models');
const server = require('./server');
const RabbitMQ = require('./classes/rabbit');
const logConfig = require('./config/logs-config');

RabbitMQ.run()
  .then(async () => {
    try {
      await database.connectToDB();
      initModels();
      server.start();
    } catch (err) {
      RabbitMQ.sendToLogger({
        logType: logConfig.logTypes.error,
        message: err,
      });
    }
  })
  .catch(err => {
    console.log(err);
  });
