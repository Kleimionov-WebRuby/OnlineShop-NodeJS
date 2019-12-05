const UserService = require('../services/user');
const AuthenticationError = require('../classes/errors/auth-error');
const InternalServerError = require('../classes/errors/server-error');

const userService = new UserService();

class AuthController {
  async login(req, res) {
    res.status(200).send(req.user);
  }

  async registration(req, res, next) {
    try {
      const user = await userService.create(req.body);

      await req.login(user, err => {
        if (err) {
          next(new AuthenticationError(err, 401));
        }

        res.status(200).send(user);
      });
    } catch ({ name, errors }) {
      if (name === 'SequelizeUniqueConstraintError') {
        next(new AuthenticationError('This user is already exist', 401));
      }

      next(new InternalServerError(errors, 500));
    }
  }

  async logout(req, res) {
    req.logOut();
    res.status(204).end();
  }
}

module.exports = AuthController;
