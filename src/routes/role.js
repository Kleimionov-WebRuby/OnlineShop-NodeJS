const express = require('express');
const isAuthorized = require('../middlewares/is-authorized');
const isAdmin = require('../middlewares/is-admin');

const router = express.Router();

const RoleController = require('../controllers/role');
const roleController = new RoleController();

// router.use(isAuthorized);

router.get('/', isAdmin, roleController.getRoles);
router.post('/', isAdmin, roleController.createRole);

module.exports = router;
