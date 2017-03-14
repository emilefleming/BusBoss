import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import Map from '../Map/Map';
import Stop from '../Stop/Stop';
import './Nearby.css';

export default class Nearby extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stops: [],
      arrivals: [],
      activeStop: {},
      mapHidden: false
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.setActiveTrip = this.setActiveTrip.bind(this);
    this.toggleView = this.toggleView.bind(this);
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

  onMarkerClick(stop) {
    this.toggleView()
    this.setState({ activeStop: stop });
    axios.get(`/api/stops/${stop.id}/arrivals`)
      .then(response => {
        console.log(response);
        this.setState({
          arrivals: response.data,
          lastUpdated: moment()
        })
      })
      .catch(err => {console.log(err)})
  }

  setActiveTrip(arrival) {
    let activeTrip = null;

    if (arrival) {
      activeTrip = arrival
      this.toggleView()
    }
    this.setState({ activeTrip })
  }

  toggleView() {
    if (window.innerWidth > 700) {
      return;
    }
    this.setState({
      mapHidden: !this.state.mapHidden
    })
  }

  render() {
    const { state, onMarkerClick, setActiveTrip } = this;
    const {
      stops, arrivals, activeStop, activeTrip, mapHidden, lastUpdated
    } = state;

    return (
      <div className="Nearby">
        <Stop
          arrivals={ arrivals }
          stop={ activeStop }
          setActiveTrip={ setActiveTrip }
          lastUpdated={ lastUpdated }
        />
        {
          (mapHidden && window.innerWidth <= 700)
          ? null
          : <div className="map">
              <Map
                stops={ stops }
                arrivals={ arrivals }
                onMarkerClick={ onMarkerClick }
                activeTrip={ activeTrip }
                activeStop={ activeStop }
                setActiveTrip={ setActiveTrip }
              />
            </div>
        }
      </div>
    )
  }
}
