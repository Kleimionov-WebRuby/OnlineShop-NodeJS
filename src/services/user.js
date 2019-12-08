const helper = require('../helpers');
const UserRepository = require('../repositories/user');

const userRepository = new UserRepository();

class UserService {
  async create(user) {
    return await userRepository.create(user);
  }

  async getUsers(query) {
    const { pagination, options } = helper.getPaginationFromQuery(query);

    return await userRepository.getAll(pagination, options);
  }
}

module.exports = UserService;
