import React, { Component } from 'react';
import './Arrival.css';
import moment from 'moment';

export default class Arrival extends Component {
  render() {
    const { arrival, setHoverTrip, setClickedTrip, lastUpdated } = this.props;
    return (
      <div
        className="Arrival"
        onClick={ () => {setClickedTrip(arrival)} }
        onMouseEnter={ () => {setHoverTrip(arrival)} }
      >
        <h3>{ arrival.routeShortName || arrival.routeLongName }</h3>
        <div className="details">
          <h4>{ arrival.tripHeadsign }</h4>
        </div>
        <MinutesUntil arrival={ arrival } lastUpdated={ lastUpdated } />
      </div>
    )
  }
}

function MinutesUntil(props) {
  const { arrival, lastUpdated } = props;
  const { predictedArrivalTime, scheduledArrivalTime } = arrival
  const predicted = predictedArrivalTime !== 0 ? '' : '*'
  const minuteDiff = Math.round(moment(predictedArrivalTime || scheduledArrivalTime ).diff(lastUpdated) / 60000);

  return (
    <div className="minutesUntil">
      { minuteDiff ? minuteDiff + predicted : 'NOW' }
      { minuteDiff ? <div>MINUTES</div> : null }

    </div>
  );
}