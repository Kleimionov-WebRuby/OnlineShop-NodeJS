const ResetPasswordService = require('../services/reset-password');
const resetPasswordService = new ResetPasswordService();

class ResetPasswordController {
  async sendPasswordResetEmail(req, res) {
    const { email } = req.body;

    await resetPasswordService.sendPasswordResetEmail(email);

    res.status(204).end();
  }

  async receiveNewPassword(req, res) {
    const { password } = req.body;

    await resetPasswordService.receiveNewPassword(req.params, password);

    res.status(204).end();
  }
}

module.exports = ResetPasswordController;
