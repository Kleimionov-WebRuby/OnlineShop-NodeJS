const mongoose = require('mongoose');
const logSchema = require('./schemas/log');

module.exports = {
  info: mongoose.model('info', logSchema),
  error: mongoose.model('error', logSchema),
};
