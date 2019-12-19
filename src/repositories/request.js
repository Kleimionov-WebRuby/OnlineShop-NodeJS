const Request = require('../models/request');

class RequestRepository {
  getRequest(userId) {
    return Request.findOne({
      where: {
        user_id: userId,
      },
    });
  }

  create(data) {
    return Request.create(data);
  }

  delete(userId) {
    return Request.destroy({
      where: {
        user_id: userId,
      },
    });
  }
}

module.exports = RequestRepository;
