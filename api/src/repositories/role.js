const Role = require('../models/role');
const UsersRoles = require('../models/users-roles');

class RoleRepository {
  getAll() {
    return Role.findAll();
  }

  getRole(data) {
    return Role.findOne({
      where: data,
    });
  }

  create(role) {
    return Role.create(role);
  }

  delete(id) {
    return Role.destroy({ where: { id } });
  }

  getRoleCount(data) {
    return UsersRoles.findAndCountAll({
      where: data,
    });
  }
}

module.exports = RoleRepository;
