const UserService = require('../services/user');
const CustomError = require('../helpers/error');

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
          next(new CustomError(err));
        }
        res.send(user);
      });
    } catch ({ name, errors }) {
      if ((name = 'SequelizeUniqueConstraintError')) {
        next(new CustomError('This user is already exist', 401));
      }
      next(new CustomError(errors, 500));
    }
  }
}

module.exports = AuthController;
