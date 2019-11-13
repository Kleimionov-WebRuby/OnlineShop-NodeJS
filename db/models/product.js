'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      defaultValue: 'https://www.tibs.org.tw/images/default.jpg',
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
