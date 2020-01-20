const mongoose = require('mongoose');
const config = require('./config');
const Logger = require('./classes/logger');
const logger = new Logger();

const RabbitMQ = require('./classes/rabbit');

mongoose.connect(config.databaseUrl, {
  useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
  logger.logInfo(`Connection has been made successfully. | logger.`);
  RabbitMQ.run();
});
db.on('error', error => {
  logger.logError(error);
});
