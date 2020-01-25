const RabbitMQ = require('./classes/rabbit');
const Mailer = require('./classes/mailer');

RabbitMQ.run()
  .then(async () => {
    await Mailer.start();
  })
  .catch(err => {
    console.log(err);
  });
