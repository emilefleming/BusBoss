import React, { Component } from 'react';
import './Arrival.css'

export default class Arrival extends Component {
  constructor(props) {
    super(props);

    this.state = { mouseOver: false }

    this.handleMouseOver = this.handleMouseOver.bind(this);
  }

  handleMouseOver() {
    this.props.setActiveTrip(this.props.arrival)
  }

  render() {
    const { props, handleMouseOver } = this;
    const { arrival, setActiveTrip } = props;
    return (
      <div
        className="Arrival"
        onClick={ () => {setActiveTrip(arrival)} }
        onMouseOver={ handleMouseOver }
      >
        <h3>{ arrival.routeShortName || arrival.routeLongName }</h3>
        <div>
          <h4>{ arrival.tripHeadsign }</h4>
        </div>
      </div>
    )
  }
}
