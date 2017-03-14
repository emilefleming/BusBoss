import React from 'react';
import Arrivals from './Arrivals';
import Trip from '../Trip/Trip';
import './Stop.css';

export default function Stop(props) {
  const {
    arrivals,
    stop,
    setHoverTrip,
    setClickedTrip,
    lastUpdated,
    clickedTrip
  } = props;

  return (
    <div className="Stop">
      <div className="stopInfo">
        <h2>{ stop.name }</h2>
      </div>
      {
        clickedTrip
        ? <Trip trip={ clickedTrip } />
        : <Arrivals
            arrivals={ arrivals }
            setHoverTrip={ setHoverTrip }
            setClickedTrip={ setClickedTrip }
            lastUpdated={ lastUpdated }
          />
      }
    </div>
  )
}
