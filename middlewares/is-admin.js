const CustomError = require('../helpers/error');

module.exports = (req, res, next) => {
  const rolesArray = req.user.roles;
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
  next();
};
