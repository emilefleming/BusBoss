import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Page from './Page/Page';
import Nearby from './Nearby/Nearby';
import Favorites from './Favorites/Favorites';
import Login from './Login/Login';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.setUserData = this.setUserData.bind(this);
  }

  setUserData(userData) {
    console.log(userData);
    this.setState({ userData })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Page>
            <Route exact path='/' render={ props => <Nearby {...props} /> } />
            <Route path='/favorites' render={ props => <Favorites {...props} /> } />
            <Route path='/login' render={ props => <Login setUserData={this.setUserData} {...props} /> } />
          </Page>
        </Router>
      </div>
    );
  }
}

export default App;
