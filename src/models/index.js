const User = require('./user');
const Role = require('./role');
const UsersRoles = require('./users-roles');
const Category = require('./category');
const Product = require('./product');
const ProductsCategories = require('./products-categories');
const Rating = require('./rating');
const UsersRemove = require('./user-remove');

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
  Product.hasMany(Rating, {
    foreignKey: 'product_id',
    onDelete: 'cascade',
    onUpdate: 'cascade',
  });
  Rating.belongsTo(Product, {
    foreignKey: 'product_id',
    onDelete: 'cascade',
    onUpdate: 'cascade',
  });
  User.hasMany(Rating, {
    foreignKey: 'user_id',
    onDelete: 'set null',
    onUpdate: 'cascade',
  });
  Rating.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    onUpdate: 'cascade',
  });
  UsersRemove.belongsTo(User, {
    through: UsersRemove,
    foreignKey: 'user_id',
    onDelete: 'cascade',
  });
  User.hasOne(UsersRemove, {
    through: UsersRemove,
    foreignKey: 'user_id',
    onDelete: 'cascade',
  });
};
