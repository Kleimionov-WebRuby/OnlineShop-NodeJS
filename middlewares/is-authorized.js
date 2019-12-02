const CustomError = require('../helpers/error');

module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw new CustomError('You are not authenticated!', 401);
  }
  next();
};
