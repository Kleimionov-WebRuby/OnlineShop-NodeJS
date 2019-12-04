const UserRepository = require('../repositories/user');
const RoleRepository = require('../repositories/role');

const userRepository = new UserRepository();
const roleRepository = new RoleRepository();

class UserService {
  async create(user) {
    const defaultRole = await roleRepository.getRole({ roleName: 'user' });
    const newUser = await userRepository.create(user);

    await newUser.addRole(defaultRole);

    const createdUser = await userRepository.getUser({ id: newUser.id });
    return createdUser;
  }

  async getUsers() {
    return await userRepository.getAll();
  }
}

module.exports = UserService;
