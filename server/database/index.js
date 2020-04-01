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
  username: String,
  repoUrl: String,
  watchers: Number
});

const Repo = mongoose.model('Repo', repoSchema);

const saveRepo = (repo) => {
  // TODO: Your code here
  // This function should save a repo to the MongoDB
  Repo.create({username: repo.owner.login, repoUrl: repo.url, watchers: repo.watchers}, (err, savedRepo) => {
    if(err){
      console.log(err);
    }else{
      Repo.findOne({repoUrl: repo.url}, (err, repos) => {
        if(err){
          console.log(err);
        }else{
          console.log(repos);
        }
      })
    }
  });
};

const getTop25Repos = () => {
  // TODO: Your code here
  // This function should get the repos from mongo
};

module.exports.SORTING_BY_FIELD = SORTING_BY_FIELD;
module.exports.saveRepo = saveRepo;
module.exports.getTop25Repos = getTop25Repos;
