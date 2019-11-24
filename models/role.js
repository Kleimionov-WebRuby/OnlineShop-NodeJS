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
  role_name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Role;
