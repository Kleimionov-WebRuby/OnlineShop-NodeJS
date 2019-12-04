const UserService = require('../services/user');

const userService = new UserService();

class UserController {
  async getUsers(req, res) {
    const users = await userService.getUsers();

    res.status(200).send(users);
  }
}

module.exports = UserController;
