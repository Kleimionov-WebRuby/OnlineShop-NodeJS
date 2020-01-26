const BadRequestError = require('../classes/errors/bad-request-error');
const NotFoundError = require('../classes/errors/not-found-error');
const RabbitMQ = require('../classes/rabbit');
const RequestRepository = require('../repositories/request');

const requestRepository = new RequestRepository();

class RequestService {
  async getAllRequests() {
    return await requestRepository.getAll();
  }

  async createRequest(user) {
    const isRequest = await requestRepository.getRequest(user.id);

    if (isRequest) {
      throw new BadRequestError('Sorry, but you already send remove request');
    }

    let removeAt = new Date();

    removeAt.setDate(removeAt.getDate() + 30);

    await requestRepository.create({ user_id: user.id, removeAt });

    RabbitMQ.sendToMailer({
      message: `
        <h2>Your request to delete your account was successfully processed.</h2>
        <br/>
        <p>You need to wait 30 days or wait for removal from the site administration</p>
      `,
      receiver: user.email,
    });
  }

  async cancelRequest(user) {
    const isRequest = await requestRepository.getRequest(user.id);

    if (!isRequest) {
      throw new NotFoundError("Sorry, you didn't send a remove request");
    }

    await requestRepository.delete(user.id);

    RabbitMQ.sendToMailer({
      message: `<h2>You have successfully canceled the request to delete your account.</h2>`,
      receiver: user.email,
    });
  }
}

module.exports = RequestService;
