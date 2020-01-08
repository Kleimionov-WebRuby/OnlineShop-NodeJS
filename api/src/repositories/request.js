const Request = require('../models/request');
const User = require('../models/user');

class RequestRepository {
  getAll() {
    return Request.findAndCountAll({
      include: {
        model: User,
        attributes: ['id', 'first_name', 'last_name', 'email'],
      },
    });
  }

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
