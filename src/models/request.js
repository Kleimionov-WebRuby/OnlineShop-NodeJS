const Sequelize = require('sequelize');
const { sequelize } = require('../database');

const Request = sequelize.define('requests', {
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

module.exports = Request;
