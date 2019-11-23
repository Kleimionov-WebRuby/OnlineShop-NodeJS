const Sequelize = require('sequelize');
const { sequelize } = require('../database');

const Product = sequelize.define('products', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  desc: {
    type: Sequelize.TEXT,
    allowNull: false,
    notEmpty: true,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  picture: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    field: 'updated_at',
    isDate: true,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    field: 'created_at',
    isDate: true,
  },
});

module.exports = Product;
