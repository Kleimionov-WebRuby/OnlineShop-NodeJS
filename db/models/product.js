'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    title: {
      type: DataTypes.STRING,
    },
    desc: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    picture: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.FLOAT,
    },
  });
  Product.associate = models => {
    Product.hasMany(models.Rating, {
      foreignKey: 'productId',
      as: 'products',
    });
  };
  return Product;
};
