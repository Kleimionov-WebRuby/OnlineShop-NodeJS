const Role = require('../models/role');

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
}

module.exports = RoleRepository;
