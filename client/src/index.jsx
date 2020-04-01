import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: [],
    };

    this.handleSearch = this.handleSearch.bind(this);
  }


  handleSearch(username) {
    console.log(`${username} was searched`);
    // TODO
    axios.post('/api/repos',{
      data: {
        username: username
      }
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log("You got this error:", error);
    });
  }

  render() {
    const { repos } = this.state;

    return (
      <div>
        <h1>Github Fetcher</h1>
        <RepoList repos={repos} />
        <Search onSearch={this.handleSearch} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
