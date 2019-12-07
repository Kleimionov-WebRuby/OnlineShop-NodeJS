const RoleService = require('../services/role');

const roleService = new RoleService();

class RoleController {
  async getRoles(res, req) {
    const roles = await roleService.getRoles();

    req.status(200).send(roles);
  }

  async createRole(req, res) {
    const result = await roleService.createRole(req.body);

    res.status(200).send(result);
  }
}

module.exports = RoleController;
