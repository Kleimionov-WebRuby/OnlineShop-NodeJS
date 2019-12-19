const BadRequestError = require('../classes/errors/bad-request-error');
const NotFoundError = require('../classes/errors/not-found-error');
const RequestRepository = require('../repositories/request');

const requestRepository = new RequestRepository();

class RequestService {
  async getAllRequests() {
    return await requestRepository.getAll();
  }

  async createRequest(userId) {
    const isRequest = await requestRepository.getRequest(userId);

    if (isRequest) {
      throw new BadRequestError('Sorry, but you already send remove request');
    }

    let removeAt = new Date();

    removeAt.setDate(removeAt.getDate() + 30);

    await requestRepository.create({ user_id: userId, removeAt });
  }

  async cancelRequest(userId) {
    const isRequest = await requestRepository.getRequest(userId);

    if (!isRequest) {
      throw new NotFoundError("Sorry, you didn't send a remove request");
    }
    await requestRepository.delete(userId);
  }
}

module.exports = RequestService;
