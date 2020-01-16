const { Schema } = require('mongoose');

module.exports = new Schema({
  message: { type: String, required: [true, 'Log must contain a message!'] },
  date: {
    type: Date,
    required: [true, 'Log must contain a date!'],
  },
});
