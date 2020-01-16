const logModels = require('../models');

class Logger {
  logInfo(message) {
    logModels.info.create({ message, date: new Date(), date: new Date() });
  }
  logError(message) {
    logModels.error.create({ message, date: new Date() });
  }
}

module.exports = Logger;
