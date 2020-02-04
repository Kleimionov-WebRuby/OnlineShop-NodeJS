const Request = require('../models/request');
const RabbitMQ = require('./rabbit');
const constants = require('../constants');

class UserCollector {
  async deleteUser() {
    const requests = await Request.findAll();

    requests.forEach(async request => {
      const dateNow = new Date();

      if (dateNow > request.removeAt) {
        const user = await request.getUser();

        RabbitMQ.sendToLogger({
          logType: constants.logTypes.logs,
          message: `User with id: ${user.id} was delete, because he send remove request more than 30 days ago`,
        });

        user.destroy();
      }
    });
  }
}

module.exports = UserCollector;
