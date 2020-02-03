const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/is-authenticated');
const isAdmin = require('../middlewares/is-admin');
const checkRequest = require('../middlewares/check-request');

const RequestController = require('../controllers/request');
const requestController = new RequestController();

router.use(isAuthenticated);

router.get('/', isAdmin, checkRequest(requestController.getAllRequests));
router.post('/', checkRequest(requestController.createRequest));
router.delete('/', checkRequest(requestController.cancelRequest));

module.exports = router;
