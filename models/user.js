const Sequelize = require('sequelize');
const { sequelize } = require('../database');

const Hash = require('../helpers/hash');
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
  removeRequest: {
    type: Sequelize.BOOLEAN,
    field: 'remove_request',
    defaultValue: 0,
    allowNull: false,
  },
});

User.prototype.validPassword = async function(password) {
  return await hash.compare(password, this.password);
};

User.beforeCreate(
  async user => (user.password = await hash.hash(user.password)),
);

module.exports = User;
