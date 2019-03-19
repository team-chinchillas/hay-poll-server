const Poll = require('../../lib/models/Poll');

describe('Poll model', () => {
  it('validates a good chirp model', () => {
    const poll = new Poll({
      question: 'how are you today?',
      inputs: ['good', 'meh', 'not great'],
      userId: '1234'
    });
  
    expect(poll.toJSON()).toEqual({
      question: 'how are you today?',
      inputs: ['good', 'meh', 'not great'],
      userId: '1234',
      _id: expect.any(Object)
    });
  });
});
