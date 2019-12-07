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
    return User.findAll({
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
    });
  }
}

module.exports = UserRepository;
