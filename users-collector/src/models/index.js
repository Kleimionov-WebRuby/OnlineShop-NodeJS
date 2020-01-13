const User = require('./user');
const Request = require('./request');

module.exports = () => {
  User.hasOne(Request, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    hooks: true,
  });
  Request.belongsTo(User, {
    foreignKey: 'user_id',
  });
};
