const RequestService = require('../services/request');
const requestService = new RequestService();

class RequestController {
  async getAllRequests(req, res) {
    const requestUsers = await requestService.getAllRequests();

    res.status(200).send(requestUsers);
  }

  async createRequest(req, res) {
    await requestService.createRequest(req.user);

    res.status(204).end();
  }

  async cancelRequest(req, res) {
    await requestService.cancelRequest(req.user);

    res.status(204).end();
  }
}

module.exports = RequestController;
