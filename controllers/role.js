const RoleService = require('../services/role');

const roleService = new RoleService();

class RoleController {
  async getRoles(res, req) {
    const roles = await roleService.getRoles();

    req.status(200).send(roles);
  }
}

module.exports = RoleController;
