'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    avatar: {
      type: DataTypes.STRING,
      defaultValue:
        'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1',
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    removeRequest: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  User.associate = models => {
    User.belongsTo(models.Role, {
      foreignKey: 'RoleId',
      as: 'roles',
    });
    User.hasMany(models.Rating, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return User;
};
