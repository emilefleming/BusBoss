import React from 'react';
import './Trip.css';
import Icon from '../Icon/Icon';

import TripStop from './TripStop';

export default function Trip(props) {
  const { trip, stops, setActiveTripStop } = props;
  const { routeShortName, routeLongName, tripStatus, tripHeadsign } = trip;

  return (
    <div className="Trip">
      <h2>
        { routeShortName || routeLongName }
        <em>{ tripHeadsign }</em>
      </h2>
      <div
        className="schedule"
        onMouseLeave={ () => { setActiveTripStop(null) } }
      >
        <div className="line"></div>
        {
          stops.map(stop =>
            <TripStop
              key={ stop.id }
              stop={ stop }
              setActiveTripStop={ setActiveTripStop }
            >
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
