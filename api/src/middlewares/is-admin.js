const AccessError = require('../classes/errors/access-error');
const InternalServerError = require('../classes/errors/server-error');

module.exports = async (req, res, next) => {
  try {
    const rolesArray = await req.user.roles;
    let isAdmin = false;

    rolesArray.forEach(role => {
      if (role.roleName === 'admin') {
        isAdmin = true;
      }
    });

    if (!isAdmin) {
      next(
        new AccessError('Access is denied. Your access rights are not enough!'),
      );
    }

    return next();
  } catch (err) {
    next(new InternalServerError(err.message));
  }
};
