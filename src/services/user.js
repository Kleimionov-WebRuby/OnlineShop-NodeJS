const UserRepository = require('../repositories/user');

const userRepository = new UserRepository();

class UserService {
  async create(user) {
    return await userRepository.create(user);
  }

  async getUsers(options) {
    return await userRepository.getAll(options);
  }
}

module.exports = UserService;
