import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import Map from '../Map/Map';
import Stop from '../Stop/Stop';
import './Nearby.css';

import io from 'socket.io-client';
const socket = io()

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
      tripStops: [],
      activeTripStop: {}
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.setHoverTrip = this.setHoverTrip.bind(this);
    this.setClickedTrip = this.setClickedTrip.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.setMapRef = this.setMapRef.bind(this);
    this.setActiveTripStop = this.setActiveTripStop.bind(this);
    this.setUserPosition = this.setUserPosition.bind(this);
    this.setMapEventListeners = this.setMapEventListeners.bind(this);

    socket.on('arrivals', data => {
      this.setState({ animate: false }, () => {
        setTimeout(() => {
          this.setState({
            arrivals: data,
            lastUpdated: moment(),
            animate: true
          });
        }, 0)
      })
    });
  };

  componentDidMount() {
    const options = {
      enableHighAccuracy: false,
    };

    function err(err) { console.log(err); }

    navigator.geolocation.watchPosition(this.setUserPosition, err, options)
  };

  setUserPosition({ coords }) {
    const lat = coords.latitude;
    const lng = coords.longitude;

    if (!this.state.userPosition) {
      this.state.mapRef.setCenter({lat, lng})
    }
    this.setState({ userPosition: { lat, lng }});
  }

  onMarkerClick(stop) {
    socket.emit('room', {
      room: `stop-${stop.id}`,
      oldRoom: `stop-${this.state.activeStop.id}`
    });

    this.toggleView()
    axios.get(`/api/stops/${stop.id}/arrivals`)
      .then(response => {
        this.setState({
          arrivals: response.data,
          lastUpdated: moment(),
          activeStop: stop,
          animate: true
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
    const { mapRef, savedMapView } = this.state;

    if (!arrival) {
      if (savedMapView) {
        mapRef.setCenter(savedMapView.center)
        mapRef.setZoom(savedMapView.zoom)
      }
      return this.setState({ clickedTrip: null, tripStops: [], savedMapView: null })
    }

    const saveMapView = {
      center: mapRef.getCenter(),
      zoom: mapRef.getZoom()
    }

    mapRef.fitBounds(getBounds(arrival.shape));
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
          savedMapView: saveMapView,
          clickedTrip: arrival,
          hoverTrip: null
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  setActiveTripStop(stop) {
    if (!stop) {
      return this.setState({ activeTripStop: {} })
    }

    this.setState({ activeTripStop: stop });
  };

  toggleView() {
    console.log('view toggled');
    if (window.innerWidth > 700) {
      return this.setState({ mapHidden: false });
    }
    this.setState({
      mapHidden: !this.state.mapHidden
    })
  };

  setMapRef(map) {
    if (!this.state.mapRef) {
      this.setMapEventListeners(map.props.map);
      this.setState({ mapRef: map.props.map });
    }
  };

  setMapEventListeners(map) {
    map.addListener('idle', () => {
      if (this.state.activeTrip) {
        return;
      }

      const { lat, lng } = map.getCenter()
      const { b, f } = map.getBounds()

      axios.get(`/api/stops?lat=${lat()}&lng=${lng()}&latSpan=${f.b - f.f}&lonSpan=${b.f - b.b}`)
        .then(response => {
          this.setState({ stops: response.data });

        })
        .catch(err => { console.log(err); })
    });
  }

  render() {
    const {
      onMarkerClick,
      setHoverTrip,
      setClickedTrip,
      setMapRef,
      setActiveTripStop,
      toggleView
    } = this;
    const {
      stops,
      arrivals,
      activeStop,
      hoverTrip,
      mapHidden,
      lastUpdated,
      clickedTrip,
      mapBounds,
      tripStops,
      activeTripStop,
      mapRef,
      userPosition,
      animate
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
          setActiveTripStop={ setActiveTripStop }
          toggleView={ toggleView }
          animate={ animate }
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
                setMapRef={ setMapRef }
                bounds={ mapBounds }
                tripStops={ tripStops }
                activeTripStop={ activeTripStop }
                mapRef={ mapRef }
                userPosition={ userPosition }
              />
            </div>
        }
      </div>
    )
  }
}
