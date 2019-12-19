const express = require('express');
const router = express.Router();
const isAuthorized = require('../middlewares/is-authorized');
const checkRequest = require('../middlewares/check-request');

const RequestController = require('../controllers/request');
const requestController = new RequestController();

router.use(isAuthorized);

router.post('/:userId', checkRequest(requestController.createRequest));
router.delete('/:userId', checkRequest(requestController.cancelRequest));

module.exports = router;
