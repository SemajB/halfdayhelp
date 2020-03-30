const { Router } = require('express');
const Repos = Router();

Repos.get('/', (req, res) => {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

Repos.post('/', (req, res) => {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

module.exports = {
  Repos,
};
