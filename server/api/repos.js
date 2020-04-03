const { Router } = require('express');
const Repos = Router();
const db = require('../database/index');
const gitHelper = require('../helpers/github');

Repos.get('/', (req, res) => {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.getTop25Repos()
  .then(repos => {
    res.status(200);
    res.send(repos);
  })
  .catch(err => {
    console.error(err);
    res.sendStatus(500);
  })
});

Repos.post('/', (req, res) => {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  let username = req.body.username;
  gitHelper.getReposByUsername(username)
  .then(repos => {
    repos.data.forEach(repo => {
      db.saveRepo(repo)
      .then(savedRepo => {
        res.sendStatus(201);
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(500);
      })
    })
  })
});

module.exports = {
  Repos,
};
