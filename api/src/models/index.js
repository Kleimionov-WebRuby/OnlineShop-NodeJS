const User = require('./user');
const Role = require('./role');
const UsersRoles = require('./users-roles');
const Category = require('./category');
const Product = require('./product');
const ProductsCategories = require('./products-categories');
const Rating = require('./rating');
const Request = require('./request');

module.exports = () => {
  User.belongsToMany(Role, {
    through: UsersRoles,
    foreignKey: 'user_id',
    onDelete: 'cascade',
  });
  Role.belongsToMany(User, { through: UsersRoles, foreignKey: 'role_id' });
  Product.belongsToMany(Category, {
    through: ProductsCategories,
    foreignKey: 'product_id',
    onDelete: 'cascade',
  });
  Category.belongsToMany(Product, {
    through: ProductsCategories,
    foreignKey: 'category_id',
    onDelete: 'cascade',
  });
  User.belongsToMany(Product, { foreignKey: 'user_id', through: Rating });
  Product.belongsToMany(User, { foreignKey: 'product_id', through: Rating });
  User.hasOne(Request, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
  });
  Request.belongsTo(User, {
    foreignKey: 'user_id',
  });
};
