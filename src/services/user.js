const UserRepository = require('../repositories/user');
const RoleRepository = require('../repositories/role');

const userRepository = new UserRepository();

class UserService {
  async create(user) {
    return await userRepository.create(user);
  }

  async getUsers() {
    return await userRepository.getAll();
  }
}

module.exports = UserService;
