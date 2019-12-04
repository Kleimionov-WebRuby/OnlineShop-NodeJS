const express = require('express');
const router = express.Router();
const passport = require('passport');
const isAuthorized = require('../middlewares/is-authorized');
const AuthController = require('../controllers/auth');

const authController = new AuthController();

router.post('/login', passport.authenticate('local'), authController.login);
router.post('/registration', authController.registration);
router.get('/logout', isAuthorized, authController.logout);

module.exports = router;
