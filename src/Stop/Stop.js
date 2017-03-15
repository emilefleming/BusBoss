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
    clickedTrip,
    tripStops,
    setActiveTripStop
  } = props;

  return (
    <div className="Stop">
      {
        clickedTrip
        ? <Trip
            trip={ clickedTrip }
            stops={ tripStops }
            setActiveTripStop={ setActiveTripStop }
            thisStop={ stop }
          />
        : <Arrivals
            arrivals={ arrivals }
            setHoverTrip={ setHoverTrip }
            setClickedTrip={ setClickedTrip }
            lastUpdated={ lastUpdated }
            stop={ stop }
          />
      }
    </div>
  )
}
