const axios = require('axios');

const config = require('../config');
const testData = require('../data.json');

const getReposByUsername = () => {
  // TODO: Use the axios module to get repos for a specific user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  const options = {
    url: 'FILL ME IN',
    headers: {
      // https://developer.github.com/v3/#user-agent-required
      'User-Agent': 'request',
      'Authorization': `token ${config.GITHUB_TOKEN}`,
    },
  };

};

module.exports.getReposByUsername = getReposByUsername;
