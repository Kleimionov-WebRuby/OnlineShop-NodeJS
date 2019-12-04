const express = require('express');
const router = express.Router();

const isAuthorized = require('../middlewares/is-authorized');

const UserController = require('../controllers/user');
const userController = new UserController();

router.use('/', userController.getUsers);

module.exports = router;
