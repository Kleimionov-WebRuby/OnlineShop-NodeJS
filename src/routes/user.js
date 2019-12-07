const express = require('express');
const router = express.Router();

const isAuthorized = require('../middlewares/is-authorized');
const isAdmin = require('../middlewares/is-admin');
const checkRequest = require('../middlewares/check-request');

const UserController = require('../controllers/user');
const userController = new UserController();

// router.use(isAuthorized);

router.use('/', /*isAdmin,*/ checkRequest(userController.getUsers));

module.exports = router;
