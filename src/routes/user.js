const express = require('express');
const router = express.Router();

const isAuthorized = require('../middlewares/is-authorized');
const isAdmin = require('../middlewares/is-admin');
const checkRequest = require('../middlewares/check-request');
const validate = require('../middlewares/validator');
const validationSchemas = require('../validation-schemas');

const UserController = require('../controllers/user');
const userController = new UserController();

router.use(isAuthorized);

router.get('/', isAdmin, checkRequest(userController.getUsers));
router.put('/', checkRequest(userController.updateUser));
router.delete(
  '/:userId',
  isAdmin,
  validate({ params: validationSchemas.id }),
  checkRequest(userController.deleteUser),
);

module.exports = router;
