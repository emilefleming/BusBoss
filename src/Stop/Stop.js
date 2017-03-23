import React, { Component } from 'react';
import Arrivals from './Arrivals';
import Trip from '../Trip/Trip';
import './Stop.css';
import { Route } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io();
import axios from 'axios';
import moment from 'moment';

export default class Stop extends Component {
  constructor(props) {
    super(props)

    this.state = {
      arrivals: [],
      stop: {}
    }

    this.fetchData = this.fetchData.bind(this);

    this.fetchData();
    this.props.routeProps.history.listen(this.fetchData);
  }

  fetchData() {
    const stopId = this.props.routeProps.match.params.id;

    socket.emit('room', {
      room: `stop-${stopId}`
    });

    socket.on('arrivals', data => {
      this.setState({ animate: false }, () => {
        setTimeout(() => {
          this.setState({
            arrivals: data,
            lastUpdated: moment(),
            animate: true
          });
        }, 0)
      })
    });

    axios.get(`/api/stops/${stopId}`)
      .then(stop => {
        axios.get(`/api/stops/${stopId}/arrivals`)
          .then(response => {
            this.setState({
              stop: stop.data,
              arrivals: response.data,
              lastUpdated: moment(),
              activeStop: stop,
              animate: true
            })
          })
      })
      .catch(err => {console.log(err)})
  }

  render() {
    const { props, state } = this;
    const {
      setHoverTrip,
      setClickedTrip,
      clickedTrip,
      tripStops,
      setActiveTripStop,
      toggleView,
      setActiveStop,
      favorites,
      toggleFavorite,
      userPosition,
      centerMap
    } = props;

    const {
      stop,
      arrivals,
      lastUpdated,
      animate
    } = state;

    return (
      <div className="Stop">
        <Route exact path='/map/stops/:id'
          render={props =>
            <Arrivals
              arrivals={ arrivals }
              setHoverTrip={ setHoverTrip }
              setClickedTrip={ setClickedTrip }
              lastUpdated={ lastUpdated }
              stop={ stop }
              animate={ animate }
              setActiveStop={ setActiveStop }
              toggleView={ toggleView }
              favorites={ favorites || [] }
              toggleFavorite={ toggleFavorite }
              routeProps={ props }
            />
          }
        />
        <Route path='/map/stops/:id/trips/:tripId'
        render={props =>
          <Trip
            stops={ tripStops }
            setActiveTripStop={ setActiveTripStop }
            thisStop={ stop }
            toggleView={ toggleView }
            setClickedTrip={ setClickedTrip }
            favorites={ favorites || [] }
            toggleFavorite={ toggleFavorite }
            routeProps={ props }
            trip={ clickedTrip }
          />
        }
      />
    </div>
    )
  }
}
