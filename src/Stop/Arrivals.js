import React from 'react'
import Arrival from '../Arrival/Arrival';
import './Arrivals.css'

export default function Arrivals(props) {
  const { arrivals, setHoverTrip, setClickedTrip, lastUpdated } = props;
  return (
    <div className="Arrivals" onMouseLeave={ () => {setHoverTrip(null)} }>
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
  )
}
