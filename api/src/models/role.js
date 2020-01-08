const Sequelize = require('sequelize');
const { sequelize } = require('../database');

const Role = sequelize.define('roles', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  roleName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    field: 'role_name',
  },
});

module.exports = Role;
