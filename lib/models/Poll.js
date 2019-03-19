const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    isRequired: true
  },
  inputs: {
    type: [String],
    isRequired: true
  },
  userId: {
    type: String,
    isRequired: true
  }
});

module.exports = mongoose.model('Poll', pollSchema);