const axios = require('axios');

const config = require('../config');
const db = require('../database/index');
// const testData = require('../data.json');

const getReposByUsername = (username) => {
  // TODO: Use the axios module to get repos for a specific user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  const options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      // https://developer.github.com/v3/#user-agent-required
      'User-Agent': 'request',
      'Authorization': `token ${config.GITHUB_TOKEN}`,
    },
  };
  return new Promise((resolve, reject) =>{
    axios.get(options.url, {
      headers: options.headers
    })
    .then(repos => {
      resolve(repos)
    })
    .catch(err => {
      reject(err);
    })
  })
};

module.exports.getReposByUsername = getReposByUsername;
