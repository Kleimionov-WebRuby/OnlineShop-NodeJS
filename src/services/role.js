const RoleRepository = require('../repositories/role');
const UserRepository = require('../repositories/user');
const BadRequestError = require('../classes/errors/bad-request-error');
const NotFoundError = require('../classes/errors/not-found-error');

const roleRepository = new RoleRepository();
const userRepository = new UserRepository();

class RoleService {
  async getRoles() {
    return await roleRepository.getAll();
  }

  async createRole(newRole) {
    const role = await roleRepository.getRole({ roleName: newRole.roleName });

    if (role) {
      throw new BadRequestError('Sorry, this role is already exist.');
    }

    return await roleRepository.create(newRole);
  }

  async deleteRole(id) {
    const role = await roleRepository.getRole({ id });

    if (!role) {
      throw new NotFoundError(
        "Sorry, this role is not found. You can't delete this role, because it doesn't exists.",
      );
    }

    await roleRepository.delete(id);

    return null;
  }

  async putRoleAdmin(userId) {
    let user = await userRepository.getUser({ id: userId });
    const adminRole = await roleRepository.getRole({ roleName: 'admin' });

    if (!adminRole) throw new NotFoundError('Sorry, this role is not found.');

    await user.addRole(adminRole);
    user = await userRepository.getUser({ id: userId });

    return user;
  }

  async removeRoleAdmin(userId) {
    let user = await userRepository.getUser({ id: userId });
    const adminRole = await roleRepository.getRole({ roleName: 'admin' });

    if (!adminRole) {
      throw new NotFoundError('Sorry, this role is not found.');
    }

    const isRole = await user.getRoles({ where: { id: adminRole.id } });

    if (!isRole || isRole.length === 0) {
      throw new BadRequestError(
        "Sorry, but this user doesn't have role 'admin'.",
      );
    }

    const roleCount = await roleRepository.getRoleCount({
      role_id: adminRole.id,
    });

    if (roleCount.count <= 1) {
      throw new BadRequestError(
        "Sorry, you can't delete this user's role because it's the last one",
      );
    }

    await user.removeRole(adminRole);
    user = await userRepository.getUser({ id: userId });

    return user;
  }
}

module.exports = RoleService;
