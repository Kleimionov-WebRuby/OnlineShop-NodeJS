const express = require('express');
const router = express.Router();
const isAuthorized = require('../middlewares/is-authorized');
const isAdmin = require('../middlewares/is-admin');
const checkRequest = require('../middlewares/check-request');

const RequestController = require('../controllers/request');
const requestController = new RequestController();

router.use(isAuthorized);

router.get('/', isAdmin, checkRequest(requestController.getAllRequests));
router.post('/', checkRequest(requestController.createRequest));
router.delete('/', checkRequest(requestController.cancelRequest));

module.exports = router;
