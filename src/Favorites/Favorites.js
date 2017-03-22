import React, { Component } from 'react';
import axios from 'axios';
import Favorite from './Favorite';
import './Favorites.css'

export default class Favorites extends Component {
  constructor(props) {
    super(props);

    this.state = { favorites: [] }

    this.removeFavorite = this.removeFavorite.bind(this);
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

  removeFavorite(id) {
    console.log(id);
    axios.delete(`/api/favorites/${this.props.userData.id}/${id}`)
      .then(response => {
        const favorites = this.state.favorites.filter(favorite =>
          favorite.id !== id
        )

        this.setState({ favorites });
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className="Favorites">
        {
          this.state.favorites.map(favorite =>
            <Favorite
              key={favorite.data.entry.id}
              favorite={ favorite }
              removeFavorite={ this.removeFavorite }
            />
          )
        }
      </div>
    )
  };
}
