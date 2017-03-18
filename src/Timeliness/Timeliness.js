import React from 'react';
import './Timeliness.css'

export default function Timeliness(props) {
  const { arrival } = props;
  const predicted = arrival.predictedDepartureTime;
  const scheduled = arrival.scheduledDepartureTime;
  const minutesLate = Math.round((predicted - scheduled) / 60000);
  let className = 'scheduled';
  let text = 'SCHEDULED *';

  if ( predicted && !minutesLate ) {
    className = 'onTime';
    text = 'ON TIME';
  }

  if ( predicted && minutesLate > 0 ) {
    className = 'late';
    text = `${minutesLate}m LATE`
  }
  if ( predicted && minutesLate < 0) {
    className = 'early';
    text = `${-minutesLate}m EARLY`
  }
  return (
    <div className={`Timeliness ${className}`}>
      { text }
    </div>
  )
}
