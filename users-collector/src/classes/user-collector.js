const Request = require('../models/request');

class UserCollector {
  async deleteUser() {
    const requests = await Request.findAll();

    requests.forEach(async request => {
      const dateNow = new Date();

      if (dateNow > request.removeAt) {
        const user = await request.getUser();

        user.destroy();
      }
    });
  }
}

module.exports = UserCollector;
