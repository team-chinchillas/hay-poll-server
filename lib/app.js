const express = require('express');
const app = express();
const { handler } = require('./middleware/error');
const cors = require('cors');
const polls = require('./routes/polls');
// const connection = require('./middleware/connection');

app.use(cors());
app.use(express.json());

app.use('/polls', polls);
app.use(handler);

module.exports = app;
