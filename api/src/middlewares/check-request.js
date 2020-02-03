const AuthorizationError = require('../classes/errors/auth-error');

const checkRequest = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return next(new AuthorizationError('This user is already exist'));
    }
    next(err);
  }
};

module.exports = checkRequest;
