import React, { Component } from 'react';
import axios from 'axios';
import Map from '../Map/Map';
import Stop from '../Stop/Stop';
import './Nearby.css'

export default class Nearby extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stops: [],
      arrivals: [],
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
  };

  componentDidMount() {
    axios.get(`/api/stops`)
      .then(response => {
        this.setState({
          stops: response.data
        })
      })
      .catch(err => {console.log(err)});
  };

  onMarkerClick(id) {
    axios.get(`/api/stops/${id}/arrivals`)
      .then(response => {
        console.log(response);
        this.setState({
          arrivals: response.data
        })
      })
      .catch(err => {console.log(err)})
  }

  render() {
    const { stops, arrivals } = this.state;
    return (
      <div className="Nearby">
        <Stop arrivals={arrivals} />
        <div className="map">
          <Map
            stops={stops}
            arrivals={arrivals}
            onMarkerClick={this.onMarkerClick}
          />
        </div>
      </div>
    )
  }
}
