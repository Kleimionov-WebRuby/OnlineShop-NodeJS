const User = require('../models/user');

class UserRepository {
  getUser(data) {
    return User.findOne({
      where: data,
    });
  }
}

module.exports = UserRepository;
