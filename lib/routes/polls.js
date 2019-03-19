
const { Router } = require('express');
const Poll = require('../models/Poll');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { question, inputs, email } = req.body;
    Poll  
      .create({ question, inputs, email }) 
      .then(poll => {
        res.send(poll);
      })
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Poll
      .find()
      .lean()
      .then(polls => res.send(polls))
      .catch(next);
  });

