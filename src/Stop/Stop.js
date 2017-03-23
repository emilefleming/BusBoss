import React, { Component } from 'react';
import Arrivals from './Arrivals';
import Trip from '../Trip/Trip';
import './Stop.css';
import { Route } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io();
import axios from 'axios';

export default class Stop extends Component {
  constructor(props) {
    super(props)

    this.fetchData = this.fetchData.bind(this);
    this.changeStop = this.changeStop.bind(this);

    this.props.routeProps.history.listen(this.changeStop);

    socket.on('arrivals', data => {
      this.props.setActiveStop(this.props.activeStop, data);
    });
  }

  componentDidMount() {
    const stopId = this.props.routeProps.match.params.id;
    this.fetchData();
    socket.emit('room', {
      room: `stop-${stopId}`
    });
  }

  componentWillUnmount() {
    socket.emit('leave', {
      room: `stop-${this.state.oldId}`
    });
    socket.off('arrivals');
  }

  changeStop() {
    const stopId = this.props.routeProps.match.params.id;
    const { oldId } = this.state;
    socket.emit('room', {
      room: `stop-${stopId}`,
      oldRoom: `stop-${oldId}`
    });
    this.fetchData();
  }

  fetchData() {
    const stopId = this.props.routeProps.match.params.id;
    this.setState({ oldId: stopId })
    axios.get(`/api/stops/${stopId}`)
      .then(stop => {
        axios.get(`/api/stops/${stopId}/arrivals`)
          .then(response => {
            this.props.setActiveStop(stop.data.entry, response.data);
          })
      })
      .catch(err => {console.log(err)})
  }

  render() {
    const {
      setHoverTrip,
      setClickedTrip,
      clickedTrip,
      tripStops,
      setActiveTripStop,
      toggleView,
      linkToStop,
      favorites,
      toggleFavorite,
      stop,
      arrivals,
      lastUpdated,
      animate
    } = this.props;

    return (
      <div className="Stop">
        <Route exact path='/map/stops/:id'
          render={props =>
            clickedTrip
            ? <Trip
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
            : <Arrivals
                arrivals={ arrivals }
                setHoverTrip={ setHoverTrip }
                setClickedTrip={ setClickedTrip }
                lastUpdated={ lastUpdated }
                stop={ stop }
                animate={ animate }
                linkToStop={ linkToStop }
                toggleView={ toggleView }
                favorites={ favorites || [] }
                toggleFavorite={ toggleFavorite }
              />
          }
        />
    </div>
    )
  }
}
