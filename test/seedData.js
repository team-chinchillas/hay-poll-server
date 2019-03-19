const Poll = require('../lib/models/Poll');
const chance = require('chance').Chance();

const questions = [
  'Are you cold?',
  'Was today fun?',
  'Do you have pet?',
  'Do you like to code?',
  'Do horses eat hay?'
];

const seedData = () => {
  return Promise.all(
    questions.map((question) => {
      return Poll.create({
        question: question,
        inputs: ['yes', 'no'],
        email: 'email@email.com'
      });
    })
  );
};

module.exports = seedData;
