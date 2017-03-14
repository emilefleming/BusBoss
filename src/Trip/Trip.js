import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import './Trip.css';

import TripStop from './TripStop'

export default class Trip extends Component {
  constructor(props) {
    super(props)

    this.state = { stops: [] };
  }

  componentDidMount() {
    axios.get(`/api/trip/${this.props.trip.tripId}`)
      .then(response => {
        const { entry, references } = response.data;
        const stopObj = entry.schedule.stopTimes.reduce((acc, stop) => {
          acc[stop.stopId] = {
            departureTime: moment(stop.departureTime * 1000 + entry.serviceDate),
            distanceAlongTrip: stop.distanceAlongTrip
          }
          return acc;
        }, {})

        const stops = references.stops.map(stop => {
          stop.departure = stopObj[stop.id]
          return stop;
        })

        this.setState({
          stops,
          date: response.data.entry.serviceDate,
          lastUpdated: moment()
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    const { trip } = this.props;
    const { stops } = this.state;
    console.log(trip);
    return (
      <div className="Trip">
        <h2>
          { trip.routeShortName || trip.routeLongName }
          <em>{ trip.tripHeadsign }</em>
        </h2>
        <div className="schedule">
          {
            stops.length > 0
            ? stops.map(stop => {
                return (
                  <TripStop key={ stop.id } stop={ stop } />
                )
              })
            : null
          }
        </div>
      </div>
    )
  }
}
