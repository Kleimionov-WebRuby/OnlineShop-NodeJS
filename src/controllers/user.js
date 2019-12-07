const UserService = require('../services/user');

const userService = new UserService();

class UserController {
  async getUsers(req, res) {
    const options = req.query;

    const users = await userService.getUsers(options);

    res.status(200).send(users);
  }
}

module.exports = UserController;
