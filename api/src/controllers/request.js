const RequestService = require('../services/request');
const requestService = new RequestService();

class RequestController {
  async getAllRequests(req, res) {
    const requestUsers = await requestService.getAllRequests();

    res.status(200).send(requestUsers);
  }

  async createRequest(req, res) {
    const { id } = req.user;

    await requestService.createRequest(id);
    res.status(204).end();
  }

  async cancelRequest(req, res) {
    const { id } = req.user;

    await requestService.cancelRequest(id);
    res.status(204).end();
  }
}

module.exports = RequestController;
