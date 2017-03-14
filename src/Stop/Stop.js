import React from 'react';
import Arrival from '../Arrival/Arrival';
import './Stop.css';

export default function Stop(props) {
  const { arrivals, stop, setHoverTrip, setClickedTrip, lastUpdated } = props;

  return (
    <div className="Stop">
      <div className="stopInfo">
        <h2>{ stop.name }</h2>
      </div>
      <div className="arrivals" onMouseLeave={ () => {setHoverTrip(null)} }>
        {
          arrivals.map(arrival =>
            <Arrival
              key={ arrival.tripId }
              arrival={ arrival }
              setHoverTrip={ setHoverTrip }
              setClickedTrip={ setClickedTrip }
              lastUpdated={ lastUpdated }
            />
          )
        }
      </div>
    </div>
  )
}
