const RoleRepository = require('../repositories/role');
const CustomError = require('../helpers/error');

const roleRepository = new RoleRepository();

class RoleService {
  async getRoles() {
    return await roleRepository.getAll();
  }

  async createRole(newRole) {
    const role = await roleRepository.getRole({ roleName: newRole.roleName });

    if (role) {
      throw new CustomError('Sorry, this role is already exist.', 401);
    }
    return await roleRepository.create(newRole);
  }
}

module.exports = RoleService;
