const RoleRepository = require('../repositories/role');
const BadRequestError = require('../classes/errors/bad-request-error');

const roleRepository = new RoleRepository();

class RoleService {
  async getRoles() {
    return await roleRepository.getAll();
  }

  async createRole(newRole) {
    const role = await roleRepository.getRole({ roleName: newRole.roleName });

    if (role) {
      throw new BadRequestError('Sorry, this role is already exist.', 400);
    }

    return await roleRepository.create(newRole);
  }

  async deleteRole(id) {
    const role = await roleRepository.getRole({ id });

    if (!role) {
      throw new BadRequestError("Sorry, this role doesn't exist", 400);
    }

    await roleRepository.delete(id);

    return null;
  }
}

module.exports = RoleService;
