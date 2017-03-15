import React from 'react';
import './Trip.css';
import Icon from '../Icon/Icon';

import TripStop from './TripStop';

export default function Trip(props) {
  const { trip, stops } = props;
  const { routeShortName, routeLongName, tripStatus, tripHeadsign } = trip;
  console.log(trip, stops);
  let passedStop = true;
  return (
    <div className="Trip">
      <h2>
        { routeShortName || routeLongName }
        <em>{ tripHeadsign }</em>
      </h2>
      <div className="schedule">
        <div className="line"></div>
        {
          stops.map(stop =>
            <TripStop key={ stop.id } stop={ stop }>
              {
                tripStatus.distanceAlongTrip > stop.departure.distanceAlongTrip
                ? <div className="stopped"><Icon i="checkbox-marked-circle" /></div>
                : null
              }
            </TripStop>
          )
        }
      </div>
    </div>
  )
}
