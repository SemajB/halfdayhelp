/* eslint-disable prefer-arrow-callback, func-names */
const { assert } = require('chai');
const nock = require('nock');
const axios = require('axios');
const mongoose = require('mongoose');

const { app } = require('../app');
const fakeData = require('./test-data.json');

const PORT = 8081;
const DB_URI = 'mongodb://localhost/fetcher';
const api = axios.create({
  baseURL: `http://localhost:${PORT}/api`,
  // Don't reject when given 'error' status codes
  validateStatus: () => true,
});

describe('API', function() {
  let server;
  let db;

  before(function() {
    if (!nock.isActive()) {
      nock.activate();
    }
  });

  beforeEach(function(done) {
    // Start server and connect to db
    server = app.listen(PORT, () => {
      mongoose.connect(DB_URI, { useNewUrlParser: true })
        .then(() => {
          const [connection] = mongoose.connections;
          db = connection;
          return db.dropDatabase();
        })
        .then(() => done())
        .catch(err => done(err));
    });
  });

  afterEach(function(done) {
    nock.cleanAll();
    server.close((errClosing) => {
      if (errClosing) {
        return done(errClosing);
      }

      return mongoose.disconnect()
        .then(() => done())
        .catch(errDisconnecting => done(errDisconnecting));
    });
  });

  after(function() {
    nock.restore();
  });

  describe('GET /repos', function() {
    it('should send back a 200 with JSON array in body', function() {
      return api.get('/repos')
        .then((response) => {
          const { status, headers, data: body } = response;

          assert.equal(status, 200);
          assert.include(headers['content-type'], 'application/json');
          assert.isArray(body);
        });
    });

    it('should send back a 500 if the database fails', function() {
      return Promise.resolve()
        .then(() => db.close(true))
        .then(() => api.get('/repos'))
        .then((response) => {
          const { status } = response;

          assert.equal(status, 500);
        });
    });
  });

  describe('POST /repos', function() {
    beforeEach(function() {
      // Stub request made to Github
      nock(/github/gi)
        .get(/.*/)
        .reply(200, fakeData);
    });

    it('should send back a 201 when sent `{ "username": "twbs" }` in body', function() {
      const body = { username: 'twbs' };

      return api.post('/repos', body)
        .then((response) => {
          const { status } = response;

          assert.equal(status, 201);
        });
    });

    it('should save repos from Github when', function() {
      const body = { username: 'twbs' };

      return Promise.resolve()
        .then(() => api.post('/repos', body))
        .then(() => db.collection('repos').find({}).toArray())
        .then((repos) => {
          assert.lengthOf(repos, fakeData.length);
        });
    });

    it('should send back a 500 if the database fails', function() {
      const body = { username: 'twbs' };

      return Promise.resolve()
        .then(() => db.close(true))
        .then(() => api.post('/repos', body))
        .then((response) => {
          const { status } = response;

          assert.equal(status, 500);
        });
    });
  });
});
