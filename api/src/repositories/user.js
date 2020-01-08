const User = require('../models/user');
const Role = require('../models/role');
const Request = require('../models/request');
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

  getAll(pagination, options) {
    const { page, size } = pagination;
    let pageNum, sizeNum;

    page ? (pageNum = page) : (pageNum = 1);
    size ? (sizeNum = size) : (sizeNum = 2);

    const skip = sizeNum * (pageNum - 1);
    const limit = sizeNum;
    const sequelizeOptions = {
      where: {
        [Op.and]: [{ ...options }],
      },
      attributes: ['id', 'first_name', 'last_name', 'email', 'password'],
      include: [
        {
          model: Role,
          attributes: ['roleName'],
          through: { attributes: [] },
        },
        {
          model: Request,
          attributes: ['id', 'remove_at'],
        },
      ],
      limit,
      offset: skip,
      order: [['id', 'DESC']],
      distinct: true, // Without this option I get wrong count in response. In count includes the included rows for example as role
    };

    return User.findAndCountAll(sequelizeOptions);
  }

  update(currentUser, newUser) {
    return currentUser.update(newUser);
  }

  delete(userId) {
    return User.destroy({
      where: {
        id: userId,
      },
    });
  }
}

module.exports = UserRepository;
