const nodemailer = require('nodemailer');
const config = require('../config/index');

class Mailer {
  start() {
    return new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport({
        service: config.mailService,
        debug: true,
        auth: {
          user: config.mailUser,
          pass: config.mailPassword,
        },
      });

      this._transporter = transporter;

      resolve();
    });
  }

  sendMail(message, receiver) {
    return new Promise((resolve, reject) => {
      const mailOptions = {
        from: config.mailUser,
        to: receiver,
        subject: config.mailSubject,
        html: message,
      };

      this._transporter.sendMail(mailOptions, (err, info) => {
        if (err) reject(err);
        else resolve(info);
      });
    });
  }
}

module.exports = new Mailer();
