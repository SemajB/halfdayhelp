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

    return (
      <div>
        <h4>Add more repos!</h4>
        Enter a github username: <input type='text' onChange={(text) => {this.handleChange(text)}} onKeyPress={(e) => {if(e.key === 'Enter') {this.handleClick()}}} />
        <button onClick={() => {this.handleClick()}} type="button">Add Repos</button>
      </div>
    );
  }
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Search;
