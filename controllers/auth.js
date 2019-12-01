class AuthController {
  async login(req, res) {
    await res.status(200).send(req.user);
  }
}

module.exports = AuthController;
