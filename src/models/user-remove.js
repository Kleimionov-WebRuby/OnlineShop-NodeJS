const Sequelize = require('sequelize');
const { sequelize } = require('../database');

const UsersRemove = sequelize.define('users_remove', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  removeAt: {
    type: Sequelize.DATE,
    allowNull: false,
    field: 'remove_at',
    isDate: true,
  },
});

module.exports = UsersRemove;
