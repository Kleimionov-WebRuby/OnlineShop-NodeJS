const Sequelize = require('sequelize');
const { sequelize } = require('../database');

const Category = sequelize.define('categories', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  categoryName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    field: 'category_name',
  },
});

module.exports = Category;
