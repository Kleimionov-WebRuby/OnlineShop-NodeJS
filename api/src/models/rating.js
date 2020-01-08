const Sequelize = require('sequelize');
const { sequelize } = require('../database');

const Rating = sequelize.define('ratings', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  ratingValue: {
    type: Sequelize.INTEGER,
    field: 'rating_value',
    allowNull: false,
  },
});

module.exports = Rating;
