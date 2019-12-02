const express = require('express');
const router = express.Router();
const passport = require('passport');

const AuthController = require('../controllers/auth');

const authController = new AuthController();

router.post('/login', passport.authenticate('local'), authController.login);
router.post('/registration', authController.registration);
router.get('/logout', authController.logout);

module.exports = router;
