const UserRepository = require('../repositories/user');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../classes/errors/not-found-error');
const Hash = require('../classes/hash');

const hash = new Hash();
const userRepository = new UserRepository();

class ResetPasswordService {
  async usePasswordHashToMakeToken(user) {
    const { password: passwordHash, id: userId, createdAt } = user;

    // `secret` is passwordHash concatenated with user's createdAt,
    // so if someones gets a user token they still need a timestamp to intercept.
    const secret = passwordHash + '-' + createdAt;
    const token = await jwt.sign({ userId }, secret, {
      expiresIn: 3600, // 1 hour
    });

    return token;
  }

  async sendPasswordResetEmail(email) {
    const user = await userRepository.getUser({ email });

    if (!user) {
      throw new NotFoundError("Sorry, but this user doesn't exist.");
    }

    const token = await this.usePasswordHashToMakeToken(user);
    const url = `http://localhost:3000/reset_password/receive_new_password/${user.id}/${token}`;
    console.log(url);
  }

  async receiveNewPassword(params, password) {
    const { userId, token } = params;
    const user = await userRepository.getUser({ id: userId });

    if (!user) {
      throw new NotFoundError("Sorry, but this user doesn't exist.");
    }

    const secret = user.password + '-' + user.createdAt;
    const payload = jwt.verify(token, secret);
    const newPassword = await hash.hash(password);

    if (payload.userId === user.id) {
      user.update({ password: newPassword });
    }
  }
}

module.exports = ResetPasswordService;
