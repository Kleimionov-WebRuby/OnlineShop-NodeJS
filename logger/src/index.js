const mongoose = require('mongoose');
const config = require('./config');
const Logger = require('./classes/logger');
const logger = new Logger();

mongoose.connect(config.databaseUrl, {
  useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('SUCCESSFULLY');
  logger.logInfo(`Connection has been made successfully.`);
});
db.on('error', error => {
  console.log('ERROR');
  logger.logError(error);
});
