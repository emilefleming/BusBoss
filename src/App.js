import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Page from './Page/Page';
import Nearby from './Nearby/Nearby';
import Favorites from './Favorites/Favorites';
import Login from './Login/Login';
import Signup from './Login/Signup';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.setUserData = this.setUserData.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentWillMount() {
    axios.get('/api/token')
      .then(response => {
        if (response.data) {
          this.setState({ userData: response.data })
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  setUserData(userData) {
    this.setState({ userData })
  }

  logOut() {
    axios.delete('/api/token')
      .then(response => {
        this.setState({ userData: null });
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Page userData={ this.state.userData } logOut={ this.logOut }>
            <Route exact
              path='/'
              render={ props => <Nearby userData={ this.state.userData }/> }
            />
            <Route
              path='/favorites'
              render={ props => <Favorites userData={ this.state.userData } /> }
            />
            <Route
              path='/login'
              render={ props => <Login setUserData={ this.setUserData } {...props} /> }
            />
            <Route
              path='/signup'
              render={ props => <Signup setUserData={ this.setUserData } {...props} /> }
            />
          </Page>
        </Router>
      </div>
    );
  }
}

export default App;
