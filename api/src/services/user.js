const helper = require('../helpers');
const AuthenticationError = require('../classes/errors/auth-error');
const NotFoundError = require('../classes/errors/not-found-error');
const UserRepository = require('../repositories/user');
const RequestRepository = require('../repositories/request');
const Hash = require('../classes/hash');

const hash = new Hash();
const userRepository = new UserRepository();
const requestRepository = new RequestRepository();

class UserService {
  async create(user) {
    return await userRepository.create(user);
  }

  async getUsers(query) {
    const queryCopy = helper.copyObject(query);

    const { pagination } = helper.carvePaginationFromQuery(queryCopy);

    return await userRepository.getAll(pagination, queryCopy);
  }

  async updateUsers(currentUser, newUser) {
    if (!currentUser) {
      throw new AuthenticationError('You are not authorized');
    }

    if (newUser.email)
      throw new AuthenticationError('Email change not allowed');

    if (newUser.password)
      throw new AuthenticationError(
        'Password cannot be changed from this endpoint',
      );

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

  async changePassword(passwords, user) {
    const { oldPassword, newPassword } = passwords;

    // The comparison of passwords is performed at the joi validation
    const isValid = await user.validPassword(oldPassword);

    if (!isValid) {
      throw new AuthenticationError("Old password isn't valid");
    }

    const hashedPassword = await hash.hash(newPassword);

    return await user.update({ password: hashedPassword });
  }
}

module.exports = UserService;
