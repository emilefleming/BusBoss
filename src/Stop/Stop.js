import React from 'react';
import Arrival from '../Arrival/Arrival';
import './Stop.css';
import StopMap from './StopMap'

export default function Stop(props) {
  const { arrivals, stop, setActiveTrip } = props;

  return (
    <div className="Stop">
      <div className="stopInfo">
        <h2>{ stop.name }</h2>
          <StopMap lat={stop.lat} lng={stop.lon} />
      </div>
      <div className="arrivals" onMouseLeave={ () => {setActiveTrip(null)} }>
        {
          arrivals.map(arrival =>
            <Arrival
              key={arrival.tripId}
              arrival={arrival}
              setActiveTrip={setActiveTrip}
            />
          )
        }
      </div>
    </div>
  )
}
