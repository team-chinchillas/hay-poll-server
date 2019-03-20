const mongoose = require('mongoose');
const mongo = require('mongodb');

const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    isRequired: true
  },
  inputs: {
    type: [String],
    isRequired: true
  },
  email: {
    type: String,
    isRequired: true
  }
});

pollSchema.statics.results = function(id) {
  return this.aggregate([
    {
      $lookup: {
        from: 'votes', 
        localField: '_id', 
        foreignField: 'pollId', 
        as: 'votesPerPoll'
      }
    }, {
      $project: {
        _id: true, 
        question: true, 
        email: true, 
        votesPerPoll: true
      }
    }, {
      $unwind: {
        path: '$votesPerPoll'
      }
    }, {
      $project: {
        _id: true, 
        question: true, 
        email: true, 
        vote: '$votesPerPoll.vote'
      }
    }, {
      $group: {
        _id: {
          _id: '$_id', 
          vote: '$vote'
        }, 
        count: {
          $sum: 1
        }
      }
    }, {
      $project: {
        _id: '$_id._id', 
        vote: '$_id.vote', 
        count: true
      }
    }, {
      $group: {
        _id: '$_id', 
        choices: {
          $addToSet: {
            count: '$count', 
            vote: '$vote'
          }
        }
      }
    }, {
      $match: {
        _id: new mongo.ObjectId(`${id}`)
      }
    }
  ]);
};

module.exports = mongoose.model('Poll', pollSchema);
