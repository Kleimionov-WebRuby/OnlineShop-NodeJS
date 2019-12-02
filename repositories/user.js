const User = require('../models/user');

class UserRepository {
  getUser(data) {
    return User.findOne({
      where: data,
    });
  }
  create(user) {
    return User.create(user);
  }
}

module.exports = UserRepository;
