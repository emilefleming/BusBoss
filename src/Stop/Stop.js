import React from 'react';
import Arrival from '../Arrival/Arrival';
import './Stop.css';

export default function Stop(props) {
  const { arrivals, stop } = props;

  console.log(stop);

  return (
    <div className="Stop">
      <div className="stopInfo">
        <h2>{ stop.name }</h2>
      </div>
      <div className="arrivals">
        {
          arrivals.map(arrival =>
            <Arrival key={arrival.tripId} arrival={arrival} />
          )
        }
      </div>
    </div>
  )
}
