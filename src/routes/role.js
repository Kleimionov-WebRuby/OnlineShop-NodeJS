const express = require('express');
const isAuthorized = require('../middlewares/is-authorized');
const isAdmin = require('../middlewares/is-admin');
const checkRequest = require('../middlewares/check-request');

const router = express.Router();

const RoleController = require('../controllers/role');
const roleController = new RoleController();

// router.use(isAuthorized);

router.get('/', isAdmin, checkRequest(roleController.getRoles));
router.post('/', isAdmin, checkRequest(roleController.createRole));

module.exports = router;
