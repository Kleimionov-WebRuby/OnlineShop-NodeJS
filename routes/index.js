const usersController = require('../controllers').users;
const roleController = require('../controllers').role;
const productController = require('../controllers').product;

module.exports = app => {
  app.post('/api/users', usersController.create);
  app.get('/api/users', usersController.getAllUsers);
  app.post('/api/role', roleController.create);
  app.get('/api/role', roleController.getAllRoles);
  app.post('/api/product', productController.create);
};
