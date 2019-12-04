const express = require('express');
const router = express.Router();

const isAuthorized = require('../middlewares/is-authorized');
const isAdmin = require('../middlewares/is-admin');

const UserController = require('../controllers/user');
const userController = new UserController();

router.use('/', isAdmin, userController.getUsers);

module.exports = router;
