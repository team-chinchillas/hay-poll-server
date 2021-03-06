
const { Router } = require('express');
const Poll = require('../models/Poll');
const ensureAuth = require('../middleware/ensureAuth');
const { getUser } = require('../services/auth');

module.exports = Router()
  .post('/', ensureAuth(), (req, res, next) => {
    const { question, inputs, email } = req.body;
    Poll  
      .create({ question, inputs, email }) 
      .then(poll => {
        res.send(poll);
      })
      .catch(next);
  })
  .get('/', ensureAuth(), (req, res, next) => {
    Poll
      .find()
      .lean()
      .then(polls => {
        // console.log(polls);
        res.send(polls);
      })
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    Poll
      .findById(id)
      .lean()
      .then(poll => {
        return Promise.all([poll, getUser(poll.id)]);
      })
      .then(([poll, user])=> res.send({ ...poll, email: user }))
      .catch(next);
  })
  .get('/:id/results', (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    Poll
      .results(id)
      .then(results => res.send(results))
      .catch(next);
  });

