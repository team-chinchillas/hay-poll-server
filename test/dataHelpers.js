require('dotenv').config();
const mongoose = require('mongoose');
const seedData = require('./seedData');
const Poll = require('../lib/models/Poll');

const connect = require('../lib/utils/connect');

beforeAll(() => {
  return connect();
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

beforeEach(() => {
  return seedData(5);
});

afterAll(() => {
  return mongoose.connection.close();
});

const getPoll = () => {
  return Poll
    .findOne({ question: 'Are you cold?' })
    .then(note => {
      return JSON.parse(JSON.stringify(note));
    });
};

module.exports = {
  getPoll
};
