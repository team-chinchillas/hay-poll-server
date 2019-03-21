module.exports = {
  getUser() {
    return Promise.resolve({
      question: 'test.user',
      email: 'test@test.com',
      inputs: ['some', 'options']
    });
  }
};
