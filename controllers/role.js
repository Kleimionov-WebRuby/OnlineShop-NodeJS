const Role = require('../db/models').Role;

module.exports = {
  async create(req, res) {
    try {
      const role = req.body.role;

      if (!role) {
        return res.status(400).send('Please fill in field "role"');
      }

      const oldRole = await Role.findOne({ where: { role: role } });

      if (oldRole !== null) {
        return res.status(400).send('Sorry this role is already exists');
      }

      const roleCollection = await Role.create({
        role,
      });

      res.status(201).send(roleCollection);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  async getAllRoles(req, res) {
    try {
      const RoleCollection = await Role.findAll();

      res.status(201).send(RoleCollection);
    } catch (error) {
      console.log(error);

      res.status(500).send(error);
    }
  },
};
