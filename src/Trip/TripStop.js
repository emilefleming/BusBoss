import React from 'react';
import './TripStop.css'

export default function TripStop(props) {
  const { stop, children, setActiveTripStop } = props

  return (
    stop.departure
    ? <div
        className="TripStop"
        onMouseEnter={ () => { setActiveTripStop(stop)}}
      >
        <div className="icon">{ children }</div>
        <div>
          <div>{ `${stop.departure.departureTime.format('h:mm A')}*` }</div>
          <h3>{ stop.name }</h3>
        </div>
      </div>
    : null
  )
}
