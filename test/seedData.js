const Poll = require('../lib/models/Poll');
const Vote = require('../lib/models/Vote');
const chance = require('chance').Chance();

const questions = [
  'Are you cold?',
  'Was today fun?',
  'Do you have pet?',
  'Do you like to code?',
  'Do horses eat hay?'
];

const votes = ['yes', 'no'];

const seedData = () => {
  return Promise.all(
    questions.map((question) => {
      return Poll.create({
        question: question,
        inputs: ['yes', 'no'],
        email: 'email@email.com'
      });
    })
  )
    .then(polls => {
      return Promise.all(
        polls.map(poll => {
          return Promise.all([...Array(10)].map(() => {
            return Vote.create({
              vote: chance.pickone(votes),
              email: 'email1@email.com',
              pollId: poll._id
            });
          })
          );
        })
      );
    });
};

module.exports = seedData;
