const express = require('express');
const isAuthorized = require('../middlewares/is-authorized');
const isAdmin = require('../middlewares/is-admin');
const checkRequest = require('../middlewares/check-request');
const validate = require('../middlewares/validator');
const validationSchemas = require('../validation-schemas');

const router = express.Router();

const RoleController = require('../controllers/role');
const roleController = new RoleController();

router.use(isAuthorized);

router.get('/', isAdmin, checkRequest(roleController.getRoles));
router.post(
  '/',
  isAdmin,
  validate({ body: validationSchemas.role }),
  checkRequest(roleController.createRole),
);
router.delete(
  '/:id',
  isAdmin,
  validate({ params: validationSchemas.id }),
  checkRequest(roleController.deleteRole),
);
router.post(
  '/putrole/:userId',
  isAdmin,
  validate({ params: validationSchemas.id }),
  checkRequest(roleController.putRoleAdmin),
);
router.delete(
  '/removerole/:userId',
  isAdmin,
  validate({ params: validationSchemas.id }),
  checkRequest(roleController.removeRoleAdmin),
);

module.exports = router;
