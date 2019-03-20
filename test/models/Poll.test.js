const Poll = require('../../lib/models/Poll');

describe('Poll model', () => {
  it('validates a good chirp model', () => {
    const poll = new Poll({
      question: 'how are you today?',
      inputs: ['good', 'meh', 'not great'],
      email: 'email@email.com'
    });
  
    expect(poll.toJSON()).toEqual({
      question: 'how are you today?',
      inputs: ['good', 'meh', 'not great'],
      email: 'email@email.com',
      _id: expect.any(Object)
    });
  });
});
