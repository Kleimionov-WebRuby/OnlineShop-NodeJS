const User = require('../models/user');
const Role = require('../models/role');

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
}

module.exports = UserRepository;
