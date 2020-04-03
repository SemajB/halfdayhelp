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
  login: String,
  url: String,
  watchers: Number
});

const Repo = mongoose.model('Repo', repoSchema);

const saveRepo = (repo) => {
  // TODO: Your code here
  // This function should save a repo to the MongoDB
  return new Promise((resolve, reject) => {
    const {owner, url, watchers} = repo;
    const {login} = owner;
    const newRepo = new Repo({login, url, watchers});

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

const getTop25Repos = () => {
  // TODO: Your code here
  // This function should get the repos from mongo
  return new Promise((resolve, reject) => {
    Repo.find((err, repos) => {
      if(err){
        reject(err);
      }else{
        resolve(repos);
      }
    })
  })
};

module.exports.SORTING_BY_FIELD = SORTING_BY_FIELD;
module.exports.saveRepo = saveRepo;
module.exports.getTop25Repos = getTop25Repos;
