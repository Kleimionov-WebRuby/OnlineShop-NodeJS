const AuthenticationError = require('../classes/errors/auth-error');

const checkRequest = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return next(new AuthenticationError('This user is already exist', 401));
    }
    next(err);
  }
};

module.exports = checkRequest;
