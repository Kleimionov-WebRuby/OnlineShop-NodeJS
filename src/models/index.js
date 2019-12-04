const User = require('./user');
const Role = require('./role');
const Category = require('./category');
const Rating = require('./rating');
const Product = require('./product');

module.exports = () => {
  User.belongsToMany(Role, {
    through: 'users_roles',
    foreignKey: 'user_id',
    onDelete: 'cascade',
  });
  Role.belongsToMany(User, { through: 'users_roles', foreignKey: 'role_id' });
  Product.belongsToMany(Category, {
    through: 'products_categories',
    foreignKey: 'product_id',
    onDelete: 'cascade',
  });
  Category.belongsToMany(Product, {
    through: 'products_categories',
    foreignKey: 'category_id',
  });
  Product.hasMany(Rating, {
    foreignKey: 'product_id',
    onDelete: 'cascade',
    onUpdate: 'cascade',
  });
  User.hasMany(Rating, {
    foreignKey: 'user_id',
    onDelete: 'set null',
    onUpdate: 'cascade',
  });
};
