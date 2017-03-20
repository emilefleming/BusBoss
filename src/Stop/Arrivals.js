import React from 'react'
import Arrival from '../Arrival/Arrival';
import './Arrivals.css';
import Icon from '../Icon/Icon'

export default function Arrivals(props) {
  const {
    arrivals, setHoverTrip, setClickedTrip, lastUpdated, stop, animate, toggleView, setActiveStop
  } = props;
  return (
    <div className="Arrivals">
      <header>
        <div onClick={ () => { setActiveStop(null) } }>
          <Icon i="arrow-left" />
        </div>
        <div className="details">
          <h2>{ stop.name }</h2>
        </div>
        <div onClick={ toggleView }>
          <Icon i="map"/>
        </div>
      </header>
      <div className="loader">
        <div className={`loadBar ${animate ? 'loadAnimation' : ''}`}></div>
      </div>
      <div className="arrivalList" onMouseLeave={ () => {setHoverTrip(null)} }>
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
