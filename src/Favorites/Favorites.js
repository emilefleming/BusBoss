import React, { Component } from 'react';
import axios from 'axios';
import Favorite from './Favorite';
import './Favorites.css';
import Loader from '../Loader/Loader';

import moment from 'moment';
import io from 'socket.io-client';
const socket = io();

export default class Favorites extends Component {
  constructor(props) {
    super(props);

    this.state = { favorites: [], loader: true };

    this.removeFavorite = this.removeFavorite.bind(this);

    socket.on('arrivals', data => {
      this.setState({ animate: false }, () => {
        const favorites = this.state.favorites.map(favorite => {
          if (favorite.data.entry.id === data[0].stopId) {
            favorite.arrivals = data;
          }

          return favorite;
        })
        setTimeout(() => {
          this.setState({
            favorites,
            lastUpdated: moment(),
            animate: true
          });
        }, 0)
      })
    });
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

  componentWillUnmount() {
    for (const favorite of this.state.favorites) {
      socket.off('arrivals');
      socket.emit('leave', {
        room: `stop-${favorite.data.entry.id}`
      });
    }
  }

  updateFavorites() {
    console.log('updateFavorites');
    axios.get(`/api/favorites/${this.props.userData.id}`)
    .then(response => {
      const favorites = response.data;
      for (const favorite of favorites) {
        socket.emit('room', {
          room: `stop-${favorite.data.entry.id}`
        });
      }
      this.setState({
        favorites, loader: false, animate: true })
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
    console.log('render');
    return (
      <div className="Favorites">
        <div className="loader">
          <div className={`loadBar ${this.state.animate ? 'loadAnimation' : ''}`}></div>
        </div>
        <div className="favoriteCards">
          {
            this.state.favorites.map(favorite =>
              <Favorite
                key={favorite.id}
                favorite={ favorite }
                removeFavorite={ this.removeFavorite }
                history={ this.props.history }
              />
            )
          }
        </div>
        {
          !this.state.favorites.length && !this.state.loader
            ? <div className="noFavorites"><h2>You don't have any favorites yet!</h2><div>You can add both stops and routes.</div></div>
            : null
        }
        {
          this.state.loader
          ? <Loader />
          : null
        }
      </div>
    )
  };
}
