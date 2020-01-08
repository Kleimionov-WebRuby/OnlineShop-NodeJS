const ResetPasswordService = require('../services/reset-password');
const resetPasswordService = new ResetPasswordService();

class ResetPasswordController {
  async sendPasswordResetEmail(req, res) {
    const { email } = req.body;

    await resetPasswordService.sendPasswordResetEmail(email);
  }

  async receiveNewPassword(req, res) {
    const { password } = req.body;

    await resetPasswordService.receiveNewPassword(req.params, password);
  }
}

module.exports = ResetPasswordController;
