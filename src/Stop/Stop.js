import React from 'react';
import Arrival from '../Arrival/Arrival'

export default function Stop(props) {
  const { arrivals } = props;
  return (
    <div className="Stop">
      {
        arrivals.map(arrival =>
          <Arrival key={arrival.tripId} arrival={arrival} />
        )
      }
    </div>
  )
}
