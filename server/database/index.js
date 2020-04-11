const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost/fetcher';
// TODO: Put the field you are gonna use to sort the repos by.
// Your schema should have this field.
const SORTING_BY_FIELD = 'watchers';

mongoose.connect(DB_URI, { useNewUrlParser: true })
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Failed to connect to database', err));

const repoSchema = new mongoose.Schema({
  // TODO: your schema here!
  name: String,
  login: String,
  html_url: String,
  watchers: Number
});

const Repo = mongoose.model('Repo', repoSchema);

const saveRepo = (repo) => {
  // TODO: Your code here
  // This function should save a repo to the MongoDB
  return new Promise((resolve, reject) => {
    const {name, owner, html_url, watchers} = repo;
    const {login} = owner;
    const newRepo = new Repo({name, login, html_url, watchers});

    Repo.find({watchers: watchers}, (err, repos) => {
      if (err) {
        reject(err);
      } 
      else if (repos.length === 0) {
        newRepo.save((err, savedRepo) => {
          if (err) {
            console.error(err);
            reject(err);
          }
          resolve(savedRepo);
        })
      } else {
        resolve(null);
      }
    })
  })
};

const getTop25Repos = (username) => {
  // TODO: Your code here
  // This function should get the repos from mongo
  return new Promise((resolve, reject) => {
    Repo.find({login: username}, (err, repos) => {
      if(err){
        reject(err);
      }else{
        repos.sort((a, b) => {
          if(a.watchers < b.watchers){
            return 1;
          }else if (a.watchers > b.watchers){
            return -1;
          }else {
            return 0;
          }
        })
        resolve(repos.slice(0, 25));
      }
    })
  })
};

module.exports.SORTING_BY_FIELD = SORTING_BY_FIELD;
module.exports.saveRepo = saveRepo;
module.exports.getTop25Repos = getTop25Repos;
