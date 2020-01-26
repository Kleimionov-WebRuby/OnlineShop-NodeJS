module.exports = {
  rabbitUrl: process.env.rabbitURL,
  logsQueue: 'shop-logs-queue',
  mailerQueue: 'shop-mailer-queue',
  mailUser: process.env.MAILER_USER,
  mailPassword: process.env.MAILER_PASSWORD,
  mailService: process.env.MAILER_SERVICE,
  mailSubject: process.env.MAILER_SUBJECT,
};
