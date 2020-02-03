const express = require('express');
const router = express.Router();
const passport = require('passport');
const isAuthenticated = require('../middlewares/is-authenticated');
const checkRequest = require('../middlewares/check-request');
const validate = require('../middlewares/validator');
const validationSchemas = require('../validation-schemas');
const AuthController = require('../controllers/auth');

const authController = new AuthController();

router.post(
  '/login',
  validate({ body: validationSchemas.userLogin }),
  passport.authenticate('local'),
  checkRequest(authController.login),
);
router.post(
  '/registration',
  validate({ body: validationSchemas.userCreate }),
  checkRequest(authController.registration),
);
router.get('/logout', isAuthenticated, checkRequest(authController.logout));

module.exports = router;
