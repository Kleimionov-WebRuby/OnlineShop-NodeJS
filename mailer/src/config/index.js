module.exports = {
  rabbitUrl: process.env.rabbitURL || 'amqp://localhost',
  logsQueue: 'shop-logs-queue',
  mailerQueue: 'shop-mailer-queue',
  mailUser: 'kleimionovweb@gmail.com',
  mailPassword: '123456Egor',
  mailService: 'gmail',
  mailSubject: 'Online shop notification',
};
