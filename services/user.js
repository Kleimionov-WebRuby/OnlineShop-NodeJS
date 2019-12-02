const UserRepository = require('../repositories/user');

const userRepository = new UserRepository();

class UserService {
  async create(user) {
    return await userRepository.create(user);
  }
}

module.exports = UserService;
