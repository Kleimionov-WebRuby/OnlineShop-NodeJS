const UserService = require('../services/user');
const userService = new UserService();

class UserController {
  async getUsers(req, res) {
    const options = req.query;

    const users = await userService.getUsers(options);

    res.status(200).send(users);
  }

  async updateUser(req, res) {
    const updatedUsers = await userService.updateUsers(req.user, req.body);

    res.status(200).send(updatedUsers);
  }

  async deleteUser(req, res) {
    const { userId } = req.params;

    await userService.deleteUser(userId);

    res.status(204).end();
  }
}

module.exports = UserController;
