import React from 'react';
import './TripStop.css'

export default function TripStop(props) {
  const { stop } = props

  return (
    stop.departure
    ? <div className="TripStop">
        <div className="icon"></div>
        <div>
          <div>{ `${stop.departure.departureTime.format('h:mm A')}*` }</div>
          <h3>{ stop.name }</h3>
        </div>
      </div>
    : null
  )
}
