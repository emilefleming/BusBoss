import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Page from './Page/Page';
import Nearby from './Nearby/Nearby';
import Favorites from './Favorites/Favorites';
import Login from './Login/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Page>
            <Route exact path='/' component={ Nearby } />
            <Route path='/favorites' component={ Favorites } />
            <Route path='/login' component={ Login } />
          </Page>
        </Router>
      </div>
    );
  }
}

export default App;
