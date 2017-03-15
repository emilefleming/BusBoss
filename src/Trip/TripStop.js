import React from 'react';
import './TripStop.css';

import Icon from '../Icon/Icon'

export default function TripStop(props) {
  const { stop, children, setActiveTripStop, yourStop } = props

  return (
    stop.departure
    ? <div
        className="TripStop"
        onMouseEnter={ () => { setActiveTripStop(stop)}}
      >
        <div className="icon">{ children }</div>
        <div className="stopDetails">
          <div>{ `${stop.departure.departureTime.format('h:mm A')}*` }</div>
          <h4>{ stop.name }</h4>
        </div>
        {
          yourStop
          ? <div className="yourStop"><Icon i="map-marker" /></div>
          : null
        }
      </div>
    : null
  )
}
