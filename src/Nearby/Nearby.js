import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import Map from '../Map/Map';
import Stop from '../Stop/Stop';
import { Route } from 'react-router-dom';
import './Nearby.css';
import NoStop from '../Stop/NoStop';

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
      tripStops: [],
      activeTripStop: {}
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.setActiveStop = this.setActiveStop.bind(this);
    this.setHoverTrip = this.setHoverTrip.bind(this);
    this.setClickedTrip = this.setClickedTrip.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.setMapRef = this.setMapRef.bind(this);
    this.setActiveTripStop = this.setActiveTripStop.bind(this);
    this.setUserPosition = this.setUserPosition.bind(this);
    this.setMapEventListeners = this.setMapEventListeners.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.centerMap = this.centerMap.bind(this);
  };

  componentDidMount() {
    const options = {
      enableHighAccuracy: false,
    };

    function err(err) { console.log(err); }

    const geoWatch = navigator.geolocation.watchPosition(this.setUserPosition, err, options);
    this.setState({ geoWatch })
    console.log('did mount');
  };

  componentDidUpdate() {
    if (!this.state.hasFavorites && this.props.userData) {
      axios.get(`/api/favorites/${this.props.userData.id}/list`)
        .then(response => {
          const favorites = response.data;
          this.setState({ favorites, hasFavorites: true })
        })
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.state.geoWatch)
    if (this.state.activeStop.id) {
      socket.off('arrivals');
      socket.emit('leave', {
        room: `stop-${this.state.activeStop.id}`
      });
    }
  }

  setUserPosition({ coords }) {
    console.log('user position');
    const lat = coords.latitude;
    const lng = coords.longitude;

    if (!this.state.userPosition) {
      this.state.mapRef.setCenter({lat, lng})
    }
    this.setState({ userPosition: { lat, lng }});
  }

  onMarkerClick(stop) {
    this.setActiveStop(stop)
  }

  setActiveStop(stop) {
    this.props.routeProps.history.push(`/map/stops/${stop.id}`);
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
    const { routeProps } = this.props;
    const tripUrl = `${routeProps.location.pathname}trips/${arrival.tripId}`

    routeProps.history.push(tripUrl);
    this.setState({ clickedTrip: arrival })
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
      return this.setState({ sidebarHidden: false });
    }
    this.setState({
      sidebarHidden: !this.state.sidebarHidden
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

  toggleFavorite(favorite, isFavorite, trip) {
    if (isFavorite) {
      axios.delete(`/api/favorites/${this.props.userData.id}/${favorite.id}`)
        .then(response => {
          const favorites = this.state.favorites.filter(fav =>
            fav.id !== favorite.id
          )

          this.setState({ favorites });
        })
        .catch(err => {
          console.log(err);
        })
    }
    else {
      const newFavorite = {
        stopId: favorite.id
      }

      if (trip) {
        newFavorite.routeId = trip.routeId;
        newFavorite.routeName = trip.routeShortName;
      }

      axios.post(`/api/favorites/${this.props.userData.id}`, newFavorite)
        .then(response => {
          const favorites = [...this.state.favorites];
          favorites.push(response.data);
          this.setState({ favorites });
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  centerMap(center, zoom) {
    const { mapRef } = this.state;

    mapRef.setCenter(center);
    if (zoom) {
      mapRef.setZoom(zoom);
    }
  }

  render() {
    const {
      onMarkerClick,
      setActiveStop,
      setHoverTrip,
      setClickedTrip,
      setMapRef,
      setActiveTripStop,
      toggleView,
      toggleFavorite,
      centerMap
    } = this;
    const {
      stops,
      arrivals,
      activeStop,
      hoverTrip,
      sidebarHidden,
      lastUpdated,
      clickedTrip,
      mapBounds,
      tripStops,
      activeTripStop,
      mapRef,
      userPosition,
      animate,
      favorites,
    } = this.state;

    return (
      <div className="Nearby">
        <div className="wrapper">
          <Route exact path='/map'
            render={props =>
              <NoStop
                userPosition={ userPosition}
                centerMap={ centerMap }
                toggleView={ toggleView }
              />
            }
          />
          {
            sidebarHidden && window.innerWidth <= 700
            ? null
            : <Route path='/map/stops/:id'
                render={props =>
                  <Stop
                    activeStop={ activeStop }
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
                    setActiveStop={ setActiveStop }
                    favorites={ favorites }
                    toggleFavorite={ toggleFavorite }
                    userPosition={ userPosition }
                    centerMap={ centerMap }
                    routeProps={ props }
                  />
                }
              />
          }
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
            toggleView={ toggleView }
            sidebarHidden={ sidebarHidden }
          />
        </div>
      </div>
    )
  }
}
