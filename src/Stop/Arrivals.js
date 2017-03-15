import React from 'react'
import Arrival from '../Arrival/Arrival';
import './Arrivals.css'

export default function Arrivals(props) {
  const { arrivals, setHoverTrip, setClickedTrip, lastUpdated, stop } = props;
  return (
    <div className="Arrivals" onMouseLeave={ () => {setHoverTrip(null)} }>
      <div className="stopInfo">
        <h2>{ stop.name }</h2>
      </div>
      <div className="arrivalList">
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
