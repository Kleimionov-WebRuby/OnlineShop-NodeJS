const Sequelize = require('sequelize');
const { sequelize } = require('../database');

const RoleRepository = require('../repositories/role');
const roleRepository = new RoleRepository();

const Hash = require('../classes/hash');
const hash = new Hash();

const User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    min: 0,
    max: 30,
    notEmpty: true,
    field: 'first_name',
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    min: 0,
    max: 30,
    notEmpty: true,
    field: 'last_name',
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmail: true,
    notEmpty: true,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    field: 'created_at',
    isDate: true,
    defaultValue: Sequelize.NOW,
  },
});

User.prototype.validPassword = async function(password) {
  return await hash.compare(password, this.password);
};

User.beforeCreate(async user => {
  user.password = await hash.hash(user.password);
});

User.afterCreate(async user => {
  const defaultRole = await roleRepository.getRole({ roleName: 'user' });

  await user.addRoles(defaultRole);
});

module.exports = User;
