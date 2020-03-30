/* eslint-disable prefer-arrow-callback, func-names */
const { assert } = require('chai');
const mongoose = require('mongoose');

const { saveRepo, getTop25Repos, SORTING_BY_FIELD } = require('../database');
const fakeData = require('./test-data.json');

const DB_URI = 'mongodb://localhost/fetcher';

describe('Database helpers', function() {
  let db;

  beforeEach(function() {
    return mongoose.connect(DB_URI, { useNewUrlParser: true })
      .then(() => {
        const [connection] = mongoose.connections;
        db = connection;
        return db.dropDatabase();
      });
  });

  afterEach(function() {
    return mongoose.disconnect();
  });

  describe('saveRepo()', function() {
    it('should save a repo to the database', function() {
      const [repo] = fakeData;

      return Promise.resolve()
        .then(() => saveRepo(repo))
        .then(() => db.collection('repos').find({}).toArray())
        .then((repos) => {
          assert.lengthOf(repos, 1);
        });
    });

    it('should not save repo already saved to the database', function() {
      const [repo] = fakeData;

      return Promise.resolve()
        .then(() => saveRepo(repo))
        .then(() => saveRepo(repo))
        .then(() => db.collection('repos').find({}).toArray())
        .then((repos) => {
          assert.lengthOf(repos, 1);
        });
    });
  });

  describe('getTop25Repos()', function() {
    beforeEach(function() {
      // Save the repos using `saveRepo`
      return Promise.all(fakeData.map(saveRepo));
    });

    it('should return 25 results from the database', function() {
      return getTop25Repos()
        .then((repos) => {
          assert.isAtMost(repos.length, 25);
        });
    });

    it('should return the results sorted by some field the database', function() {
      return getTop25Repos()
        .then((repos) => {
          // Sorting the repos manually here to check if they match the provided repos
          const sortedRepos = repos.sort((repo1, repo2) => {
            const repo1Field = repo1[SORTING_BY_FIELD];
            const repo2Field = repo2[SORTING_BY_FIELD];

            if (repo1Field === repo2Field) {
              return 0;
            }
            return repo1Field > repo2Field ? 1 : -1;
          });

          assert.deepEqual(repos, sortedRepos);
        });
    });
  });
});
