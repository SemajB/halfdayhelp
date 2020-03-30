import React from 'react';
import PropTypes from 'prop-types';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };

  }

  handleChange(e) {
    this.setState({
      username: e.target.value,
    });
  }

  handleClick() {
    const { onSearch } = this.props;
    const { username } = this.state;

    onSearch(username);
  }

  render() {
    const { username } = this.state;

    return (
      <div>
        <h4>Add more repos!</h4>
        Enter a github username: <input value={username} onChange={this.handleChange} />
        <button onClick={this.handleClick} type="button">Add Repos</button>
      </div>
    );
  }
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Search;
