import React from 'react';
import './TripStop.css';

export default function TripStop(props) {
  const {
    stop,
    children,
    setActiveTripStop,
    yourStop,
    routeProps,
    centerMap
  } = props

  return (
    stop.departure
    ? <div
        className="TripStop"
        onMouseEnter={ () => { setActiveTripStop(stop)}}
        onClick={ () => {
          routeProps.history.push(`/map/stops/${stop.id}`);
          centerMap({
            lat: stop.lat,
            lng: stop.lon
          });
        } }
      >
        <div className="icon">{ children }</div>
        <div className="stopDetails">
          <div>{ `${stop.departure.departureTime.format('h:mm A')}*` }</div>
          <h4>{ stop.name }</h4>
        </div>
        {
          yourStop
          ? <div className="yourStop">
              <img src="/icons/stops/selected.svg" alt="Current stop icon" />
            </div>
          : null
        }
      </div>
    : null
  )
}
