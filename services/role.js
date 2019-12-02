const RoleRepository = require('../repositories/role');
const CustomError = require('../helpers/error');

const roleRepository = new RoleRepository();

class RoleService {
  async getRoles() {
    return await roleRepository.getAll();
  }
}

module.exports = RoleService;
