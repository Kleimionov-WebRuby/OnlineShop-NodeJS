const helper = require('../helpers');
const UserRepository = require('../repositories/user');

const userRepository = new UserRepository();

class UserService {
  async create(user) {
    return await userRepository.create(user);
  }

  async getUsers(query) {
    const queryCopy = JSON.parse(JSON.stringify(query));

    const { pagination } = helper.carvePaginationFromQuery(queryCopy);

    return await userRepository.getAll(pagination, queryCopy);
  }
}

module.exports = UserService;
