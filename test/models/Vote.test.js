const Vote = require('../../lib/models/Vote');
const Poll = require('../../lib/models/Poll');

describe('Vote model', () => {
  it('validates a good chirp model', () => {
    const poll = new Poll({
      question: 'how are you today?',
      inputs: ['good', 'meh', 'not great'],
      email: 'email@email.com'
    });

    const vote = new Vote({
      pollId: poll._id,
      vote: 'yes',
      email: 'email@email.com'
    });
  
    expect(vote.toJSON()).toEqual({
      pollId: expect.any(Object),
      vote: 'yes',
      email: 'email@email.com',
      _id: expect.any(Object)
    });
  });
});
