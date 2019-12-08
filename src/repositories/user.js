const User = require('../models/user');
const Role = require('../models/role');
const { Op } = require('sequelize');

class UserRepository {
  getUser(data) {
    return User.findOne({
      where: data,
      include: [
        {
          model: Role,
          attributes: ['roleName'],
          through: { attributes: [] },
        },
      ],
    });
  }
  create(user) {
    return User.create(user);
  }

  getAll(options) {
    return User.findAndCountAll({
      where: {
        [Op.and]: [{ ...options }],
      },
      attributes: [
        'id',
        'first_name',
        'last_name',
        'email',
        'password',
        'remove_request',
      ],
      include: [
        {
          model: Role,
          attributes: ['roleName'],
          through: { attributes: [] },
        },
      ],
      distinct: true, // Without this option I get wrong count in response. In count includes the included rows as role
    });
  }
}

module.exports = UserRepository;
