const CustomError = require('../classes/error');

module.exports = async (req, res, next) => {
  try {
    if (req.user) {
      const rolesArray = await req.user.roles;
      let isAdmin = false;

      rolesArray.forEach(role => {
        if (role.roleName === 'admin') {
          isAdmin = true;
        }
      });

      if (!isAdmin) {
        next(
          new CustomError(
            'Access is denied. Your access rights are not enough!',
            400,
          ),
        );
      }

      return next();
    }

    next(new CustomError('You are not authenticated!', 401));
  } catch (err) {
    next(new CustomError(err.message, 500));
  }
};
