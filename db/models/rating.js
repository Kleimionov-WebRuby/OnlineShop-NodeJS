'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Rating.associate = models => {
    Rating.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'users',
    });
    Rating.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'products',
    });
  };
  return Rating;
};
