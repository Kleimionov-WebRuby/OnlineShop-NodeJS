const express = require('express');
const isAuthorized = require('../middlewares/is-authorized');

const router = express.Router();

const RoleController = require('../controllers/role');
const roleController = new RoleController();

// router.use(isAuthorized);

router.get('/', roleController.getRoles);

module.exports = router;
