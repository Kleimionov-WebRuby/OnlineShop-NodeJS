const express = require('express');
const router = express.Router();
const passport = require('passport');
const isAuthorized = require('../middlewares/is-authorized');
const checkRequest = require('../middlewares/check-request');
const AuthController = require('../controllers/auth');

const authController = new AuthController();

router.post(
  '/login',
  passport.authenticate('local'),
  checkRequest(authController.login),
);
router.post('/registration', checkRequest(authController.registration));
router.get('/logout', isAuthorized, checkRequest(authController.logout));

module.exports = router;
