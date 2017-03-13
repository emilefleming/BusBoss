import React, { Component } from 'react';
import './Arrival.css';
import moment from 'moment';

export default class Arrival extends Component {
  constructor(props) {
    super(props);

    this.state = { mouseOver: false }

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
  }

  handleMouseEnter() {
    this.props.setActiveTrip(this.props.arrival)
  }

  render() {
    const { props, handleMouseEnter } = this;
    const { arrival, setActiveTrip } = props;
    return (
      <div
        className="Arrival"
        onClick={ () => {setActiveTrip(arrival)} }
        onMouseEnter={ handleMouseEnter }
      >
        <h3>{ arrival.routeShortName || arrival.routeLongName }</h3>
        <div className="details">
          <h4>{ arrival.tripHeadsign }</h4>
        </div>
        <MinutesUntil arrival={ arrival } />
      </div>
    )
  }
}

function MinutesUntil(props) {
  const { predictedArrivalTime, scheduledArrivalTime } = props.arrival
  const predicted = predictedArrivalTime !== 0 ? '' : '*'
  const minuteDiff = Math.round(moment(predictedArrivalTime || scheduledArrivalTime ).diff(moment()) / 60000);

  return (
    <div className="minutesUntil">
      { minuteDiff ? minuteDiff + predicted : 'NOW' }
      { minuteDiff ? <div>MINUTES</div> : null }

    </div>
  );
}
