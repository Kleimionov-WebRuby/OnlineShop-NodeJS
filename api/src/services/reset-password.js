const UserRepository = require('../repositories/user');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../classes/errors/not-found-error');
const RabbitMQ = require('../classes/rabbit');
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
      expiresIn: 60 * 60 * 24, // 24 hours
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

    RabbitMQ.sendToMailer({
      message: `
        <h2>Hi ${user.firstName},</h2>
        <div style="font-size: 16px;">
          <p>You recently requested to reset your password for your Online Shop account. Use the button below to reset it. This password reset is only valid for the next 24 hours.</p>
          <a 
            href="${url}" 
            style="background-color: #22BC66;border-radius: 3px;color: #FFF;text-decoration: none;padding: 10px 20px;margin-bottom: 10px;display: inline-block;" 
            target="_blank"
          >
            Reset your password
          </a>
          <p>If you did not request a password reset, please ignore this email.</p>
          <p>Thanks, <br/>
          The Online Shop Team</p>
        </div>
      `,
      receiver: email,
    });
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
      await user.update({ password: newPassword });

      RabbitMQ.sendToMailer({
        message: `
          <h2>Dear ${user.firstName},</h2>
          <div style="font-size: 16px;">
            <p>You successfully reset your password and set a new one</p>
            <p>Thanks, <br/>
            The Online Shop Team</p>
          </div>
        `,
        receiver: user.email,
      });
    }
  }
}

module.exports = ResetPasswordService;
