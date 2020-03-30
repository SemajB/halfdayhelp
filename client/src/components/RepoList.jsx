import React from 'react';
import PropTypes from 'prop-types';

const RepoList = props => (
  <div>
    <h4>Repo List Component</h4>
    Top {repos.length} repos by YOUR_CRITERIA.
  </div>
);

RepoList.propTypes = {
  repos: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
  })).isRequired,
};

export default RepoList;
