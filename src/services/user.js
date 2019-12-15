const helper = require('../helpers');
const AuthenticationError = require('../classes/errors/auth-error');
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

  async updateUsers(currentUser, newUser) {
    if (!currentUser) {
      throw new AuthenticationError('You are not authorized');
    }

    return await userRepository.update(currentUser, newUser);
  }
}

module.exports = UserService;
