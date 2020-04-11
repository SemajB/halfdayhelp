import React from 'react';
import PropTypes from 'prop-types';

const RepoList = props => (
  <div>
    <h4>Repo List Component</h4>
    Top {props.repos.length} repos by watchers.
    <ul>
      {props.repos.map(repo => {
       return (<li key={repo._id}>{repo.login}: <a href={repo.html_url}>{repo.name}</a></li>)
      })}
    </ul>
  </div>
);

RepoList.propTypes = {
  repos: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
  })).isRequired,
};

export default RepoList;
