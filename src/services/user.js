const helper = require('../helpers');
const AuthenticationError = require('../classes/errors/auth-error');
const NotFoundError = require('../classes/errors/not-found-error');
const UserRepository = require('../repositories/user');
const RequestRepository = require('../repositories/request');

const userRepository = new UserRepository();
const requestRepository = new RequestRepository();

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

  async deleteUser(userId) {
    const user = await userRepository.getUser({ id: userId });
    const isRequest = await requestRepository.getRequest(userId);

    if (!user) {
      throw new NotFoundError(
        "Sorry, you can't delete this user, because he doesn't exist",
      );
    } else if (!isRequest) {
      throw new NotFoundError(
        "Sorry, but this user didn't send remove request",
      );
    }

    return await userRepository.delete(userId);
  }
}

module.exports = UserService;
