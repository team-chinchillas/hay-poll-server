require('dotenv').config();
require('../../lib/utils/connect')();
const request = require('supertest');
const app = require('../../lib/app');

describe('polls route', () => {
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
})
;
