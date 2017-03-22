import React, { Component } from 'react';
import axios from 'axios';
import Favorite from './Favorite';
import './Favorites.css'

export default class Favorites extends Component {
  constructor(props) {
    super(props);

    this.state = { favorites: [] }
  }

  componentDidMount() {
    if (this.props.userData) {
      this.updateFavorites();
    }
  };

  componentDidUpdate() {
    if (this.state.isLoaded) {
      return;
    }

    this.setState({ isLoaded: true })
    this.updateFavorites()
  }

  updateFavorites() {
    axios.get(`/api/favorites/${this.props.userData.id}`)
    .then(response => {
      this.setState({ favorites: response.data, isLoaded: true })
    })
    .catch(err => {
      console.log(err);
    })
  };

  render() {
    return (
      <div className="Favorites">
        {
          this.state.favorites.map(favorite =>
            <Favorite key={favorite.data.entry.id} favorite={ favorite } />
          )
        }
      </div>
    )
  };
}
