const express = require('express');
const checkRequest = require('../middlewares/check-request');
const router = express.Router();

const ResetPasswordController = require('../controllers/reset-password');
const resetPasswordController = new ResetPasswordController();

router.post('/', checkRequest(resetPasswordController.sendPasswordResetEmail));
router.post(
  '/receive_new_password/:userId/:token',
  checkRequest(resetPasswordController.receiveNewPassword),
);

module.exports = router;
