import React, { Component } from 'react';
import './Arrival.css';
import moment from 'moment';
import Timeliness from '../Timeliness/Timeliness'
import Icon from '../Icon/Icon'

export default function Arrival(props) {
  const { arrival, setHoverTrip, setClickedTrip, lastUpdated } = props;
  let title = arrival.routeShortName || arrival.routeLongName;

  if (title === 'LINK') {
    title = <div className="link">LINK</div>
  }
  else if (title.match(/Line$/)) {
    title = <div className="brt"><p>{title.slice(0, 1)}</p></div>
  }
  else if (arrival.routeId.match(/^95/)) {
    title = <div className="ferry"><Icon i='ferry' /></div>
  }
  return (
    <div
      className="Arrival"
      onClick={ () => { setClickedTrip(arrival)} }
      onMouseEnter={ () => {setHoverTrip(arrival)} }
    >
      <h3>{ title }</h3>
      <div className="details">
        <h4>{ arrival.tripHeadsign }</h4>
        <h5>
          <Timeliness arrival={ arrival } />
        </h5>
      </div>
      <MinutesUntil arrival={ arrival } lastUpdated={ lastUpdated } />
    </div>
  )
}

function MinutesUntil(props) {
  const { arrival, lastUpdated } = props;
  const { predictedDepartureTime, scheduledDepartureTime } = arrival
  const predicted = predictedDepartureTime !== 0 ? '' : '*'
  const minuteDiff = Math.round(moment(predictedDepartureTime || scheduledDepartureTime ).diff(lastUpdated) / 60000);

  return (
    <div className="minutesUntil">
      { minuteDiff ? minuteDiff + predicted : 'NOW' }
      { minuteDiff ? <div>MINUTES</div> : null }
    </div>
  );
}
