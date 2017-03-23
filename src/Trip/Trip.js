import React, { Component } from 'react';
import './Trip.css';
import Icon from '../Icon/Icon';
import axios from 'axios';
import moment from 'moment';

import TripStop from './TripStop';
import Timeliness from '../Timeliness/Timeliness';
import FavoriteButton from '../Favorites/FavoriteButton';

export default class Trip extends Component {
  constructor(props) {
    super(props)

    this.state = {
      trip: {}
    };

    axios.get(`/api/trip/${props.routeProps.match.params.tripId}`)
      .then(response => {
        const { entry, references } = response.data;
        const stopObj = entry.schedule.stopTimes.reduce((acc, stop) => {
          acc[stop.stopId] = {
            departureTime: moment(stop.departureTime * 1000 + entry.serviceDate),
            distanceAlongTrip: stop.distanceAlongTrip
          }
          return acc;
        }, {})

        const tripStops = references.stops.map(stop => {
          stop.departure = stopObj[stop.id]
          return stop;
        })

        console.log(response.data);
        this.setState({
          trip: response.data.entry,
          tripStops,
          hoverTrip: null
        });
      })
      .catch(err => {
        console.log(err);
      })
  }
  render() {
    const {
      stops,
      setActiveTripStop,
      thisStop,
      toggleView,
      setClickedTrip,
      favorites,
      toggleFavorite
    } = this.props;

    const trip = this.state.trip || this.props.trip;
    const { routeShortName, routeLongName, tripStatus, tripHeadsign } = trip;

    const isFavorite = favorites.reduce((acc, favorite) => {
      if (favorite.stopId === thisStop.id && favorite.routeId === trip.routeId) {
        return acc = favorite;
      }
      return acc;
    }, false)

    return (
      <div className="Trip">
        <header>
          <div onClick={ () => { setClickedTrip(null) } }>
            <Icon i="arrow-left" />
          </div>
          <div className="details">
            <h2>
              { routeShortName || routeLongName }
            </h2>
            <h3>{ tripHeadsign }</h3>
            <h4><Timeliness arrival={ trip }/></h4>
          </div>
          <div onClick={ toggleView }>
            <Icon i="map"/>
          </div>
        </header>
        <div
          className="schedule"
          onMouseLeave={ () => { setActiveTripStop(null) } }
          >
            <div className="stops">
              <div className="line"></div>
              {
                stops.map(stop =>
                  stop.departure
                  ? <TripStop
                    key={ stop.id }
                    stop={ stop }
                    setActiveTripStop={ setActiveTripStop }
                    yourStop={ thisStop.id === stop.id }
                    >
                      {
                        tripStatus.distanceAlongTrip > stop.departure.distanceAlongTrip
                        ? <div className="stopped"><Icon i="checkbox-marked-circle" /></div>
                        : null
                      }
                    </TripStop>
                    : null
                  )
                }
              </div>
            </div>
            <FavoriteButton
              isFavorite={ isFavorite }
              toggleFavorite={ toggleFavorite }
              stop={ thisStop }
              trip={ trip }
            />
          </div>
        )
  }
}
