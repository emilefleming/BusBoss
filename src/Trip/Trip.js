import React from 'react';
import './Trip.css';
import Icon from '../Icon/Icon';

import TripStop from './TripStop';

export default function Trip(props) {
  const {
    trip,
    stops,
    setActiveTripStop,
    thisStop,
    toggleView,
    setClickedTrip
  } = props;
  const { routeShortName, routeLongName, tripStatus, tripHeadsign } = trip;

  return (
    <div className="Trip">
      <header>
        <div onClick={ () => { setClickedTrip(null) } }>
          <Icon i="arrow-left" />
        </div>
        <h2>
          { routeShortName || routeLongName }
        </h2>
        <div onClick={ toggleView }>
          <Icon i="map"/>
        </div>
      </header>
      <h3>{ tripHeadsign }</h3>
      <div
        className="schedule"
        onMouseLeave={ () => { setActiveTripStop(null) } }
      >
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
  )
}
