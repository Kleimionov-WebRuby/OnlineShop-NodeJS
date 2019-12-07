const AuthenticationError = require('../classes/errors/auth-error');

module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw new AuthenticationError('You are not authenticated!');
  }
  next();
};
