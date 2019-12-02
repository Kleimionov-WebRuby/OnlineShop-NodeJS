const Role = require('../models/role');

class RoleRepository {
  getRole(data) {
    return Role.findOne({
      where: data,
    });
  }
}

module.exports = RoleRepository;
