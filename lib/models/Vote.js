const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  pollId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Poll',
    isRequired: true
  },
  email: {
    type: String,
    isRequired: true
  },
  vote: {
    type: String,
    isRequired: true
  }
});

module.exports = mongoose.model('Vote', voteSchema);
