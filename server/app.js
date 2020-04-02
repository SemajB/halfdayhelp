const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const { Repos } = require('./api/repos');

const CLIENT_PATH = path.resolve(__dirname, '../client/dist');
const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use(express.static(CLIENT_PATH));
app.use('/api/repos', Repos);

module.exports = {
  app,
};
