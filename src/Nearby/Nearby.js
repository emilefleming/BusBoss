import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import Map from '../Map/Map';
import Stop from '../Stop/Stop';
import './Nearby.css';

function getBounds(shape) {
  const bounds = new window.google.maps.LatLngBounds();

  for (const point of shape) {
    bounds.extend(point)
  }

  return bounds;
}

export default class Nearby extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stops: [],
      arrivals: [],
      activeStop: {},
      mapHidden: false,
      tripStops: []
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.setHoverTrip = this.setHoverTrip.bind(this);
    this.setClickedTrip = this.setClickedTrip.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.setMapRef = this.setMapRef.bind(this);
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

  setHoverTrip(arrival) {
    let hoverTrip = null;

    if (this.state.clickedTrip) {
      return;
    }
    if (arrival) {
      hoverTrip = arrival
    }
    this.setState({ hoverTrip })
  }

  setClickedTrip(arrival) {
    let mapBounds;

    if (!arrival) {
      return this.setState({ clickedTrip: null })
    }

    mapBounds = getBounds(arrival.shape);
    axios.get(`/api/trip/${arrival.tripId}`)
      .then(response => {
        const { entry, references } = response.data;
        const stopObj = entry.schedule.stopTimes.reduce((acc, stop) => {
          acc[stop.stopId] = {
            departureTime: moment(stop.departureTime * 1000 + entry.serviceDate),
            distanceAlongTrip: stop.distanceAlongTrip
          }
          return acc;
        }, {})

        const tripStops = references.stops.map(stop => {
          stop.departure = stopObj[stop.id]
          return stop;
        })

        this.setState({
          tripStops,
          mapBounds,
          clickedTrip: arrival,
          hoverTrip: null
        });
        this.toggleView()
      })
      .catch(err => {
        console.log(err);
      })
  }

  toggleView() {
    if (window.innerWidth > 700) {
      return;
    }
    this.setState({
      mapHidden: !this.state.mapHidden
    })
  }

  setMapRef(map) {
    console.log(map);
    this.setState({ map })
  }

  render() {
    const { onMarkerClick, setHoverTrip, setClickedTrip, setMapRef } = this;
    const {
      stops,
      arrivals,
      activeStop,
      hoverTrip,
      mapHidden,
      lastUpdated,
      clickedTrip,
      mapBounds,
      tripStops
    } = this.state;

    return (
      <div className="Nearby">
        <Stop
          arrivals={ arrivals }
          stop={ activeStop }
          setHoverTrip={ setHoverTrip }
          lastUpdated={ lastUpdated }
          setClickedTrip={ setClickedTrip }
          clickedTrip={ clickedTrip }
          tripStops={ tripStops }
        />
        {
          (mapHidden && window.innerWidth <= 700)
          ? null
          : <div className="map">
              <Map
                stops={ stops }
                arrivals={ arrivals }
                onMarkerClick={ onMarkerClick }
                activeStop={ activeStop }
                activeTrip={ clickedTrip || hoverTrip }
                clickedTrip={ clickedTrip }
                setClickedTrip={ setClickedTrip }
                setMapRef={ setMapRef }
                bounds={ mapBounds }
                tripStops={ tripStops }
              />
            </div>
        }
      </div>
    )
  }
}
