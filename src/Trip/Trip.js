import React from 'react';
import './Trip.css';

import TripStop from './TripStop'

export default function Trip(props) {
  const { trip, stops } = props;
  return (
    <div className="Trip">
      <h2>
        { trip.routeShortName || trip.routeLongName }
        <em>{ trip.tripHeadsign }</em>
      </h2>
      <div className="schedule">
        <div className="line"></div>
        {
          stops.map(stop => {
            return (
              <TripStop key={ stop.id } stop={ stop } />
            )
          })
        }
      </div>
    </div>
  )
}
