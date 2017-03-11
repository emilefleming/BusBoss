import React from 'react';
import './Arrival.css'

export default function Arrival(props) {
  const { arrival } = props;
  console.log(arrival);
  return (
    <div className="Arrival">
      <h3>{ arrival.routeShortName || arrival.routeLongName }</h3>
      <h4>{ arrival.tripHeadsign }</h4>
    </div>
  )
}
