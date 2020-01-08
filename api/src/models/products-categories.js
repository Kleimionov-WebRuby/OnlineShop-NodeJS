const Sequelize = require('sequelize');
const { sequelize } = require('../database');

const ProductsCategories = sequelize.define('products_categories', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
});

module.exports = ProductsCategories;
