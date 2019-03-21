require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');
const seedData = require('../seedData');
const { getPoll } = require('../dataHelpers');

jest.mock('../../lib/middleware/ensureAuth.js');
jest.mock('../../lib/services/auth.js');
describe('polls route', () => {
  beforeEach(() => {
    return seedData();
  });

  afterEach(done => {
    mongoose.connection.dropDatabase(done);
    
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });

  it('posts a new poll', () => {
    return request(app) 
      .post('/polls')
      .send({
        question: 'how are you today?',
        inputs: ['good', 'meh', 'not great'],
        email: 'email@email.com'
      })
      .then(res => {
        expect(res.body).toEqual({
          question: 'how are you today?',
          inputs: ['good', 'meh', 'not great'],
          email: 'email@email.com',
          __v: 0,
          _id: expect.any(String)
        });
      });      
  });

  it('gets a list of polls', () => {
    return request(app) 
      .get('/polls')
      .then(res => {
        expect(res.body).toHaveLength(10);
      });
  });



  it('gets a poll by id', async() => {
    const { _id } = await getPoll();
    return request(app)
      .get(`/polls/${_id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id,
          inputs: ['yes', 'no'],
          question: 'Are you cold?',
          email:
         { question: 'test.user',
           email: 'test@test.com',
           inputs: ['some', 'options'] },
          __v: 0 });
      });
  });
 
  it('get results from poll', async() => {
    const { _id } = await getPoll();
    return request(app)
      .get(`/polls/${_id}/results`)
      .then(res => {
        expect(res.body).toEqual([{
          _id,
          choices: expect.any(Array)
        }]);
      });
  });



});
