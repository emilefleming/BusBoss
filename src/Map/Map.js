import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, Polyline } from 'react-google-maps';
import './Map.css';
import mapStyles from './mapStyles.json';
import Icon from '../Icon/Icon'
import markerIcon from './markerIcon';

export default class Map extends Component {
  constructor(props) {
    super(props)

    this.generateStopIcons = this.generateStopIcons.bind(this);
  }

  componentDidUpdate() {
    if (this.props.mapRef) {
      window.google.maps.event.trigger(this.props.mapRef,'resize')
    }
  }

  generateStopIcons() {
    const length = this.props.activeTrip.tripStatus.totalDistanceAlongTrip;
    const id = this.props.activeTripStop.id;
    const { activeStop } = this.props;
    let thisStop;

    const setIcon = function(path, strokeColor, distance, scale) {
      return {
        icon: {
          path,
          strokeColor,
          scale,
          fillOpacity: 1,
          fillColor: 'white',
          strokeWeight: 2,
          strokeOpacity: 1,
          anchor: new window.google.maps.Point(10, 10)
        },
        offset: `${( distance / length ) * 100}%`
      }
    }


    const allStopMarkers = this.props.tripStops.map(stop => {
      if (activeStop.id === stop.id) {
        thisStop = stop;
      }

      if (!stop.departure || (id && id !== stop.id)) {
        return { icon: null }
      }

      return setIcon('M20,10c0,5.5-4.5,10-10,10S0,15.5,0,10S4.5,0,10,0S20,4.5,20,10z', '#EF382B', stop.departure.distanceAlongTrip, .75 )
    })

    if (thisStop) {
      const thisStopMarker = setIcon('M19,10a9,9,0,1,1-9-9A9,9,0,0,1,19,10ZM10,6.56v6.88M6.56,10h6.88', '#007DC5', thisStop.departure.distanceAlongTrip, 1);

      allStopMarkers.push(thisStopMarker)
      return allStopMarkers;
    }

    return allStopMarkers;
  }

  render() {
    console.log('map render');
    const {
      arrivals,
      onMarkerClick,
      activeTrip,
      activeStop,
      setMapRef,
      userPosition,
      toggleView,
      sidebarHidden,
      markers,
      centerMap
    } = this.props

    return (
      <div
        className={`Map${ !sidebarHidden && window.innerWidth <= 700 ? ' hidden' : ''}`}
      >
        <div className="backButton" onClick={ toggleView }>
          <Icon i='arrow-left'/>
        </div>
        {
          userPosition
          ? <div
              className="centerMapButton"
              onClick={ () => {centerMap(userPosition)} }
            >
              <Icon i='map-marker-circle'/>
            </div>
          : null
        }
        <GoogleMapLoader
          containerElement={
            <div
              { ...this.props.containerElementProps }
              style={{
                height: "100%",
              }}
            />
          }
          googleMapElement={
            <GoogleMap
              defaultOptions={{
                styles: mapStyles,
                center: { lat: 47.6062, lng: -122.3321 },
                zoom: 16,
                fullscreenControl: false,
                mapTypeControl: false
              }}
              ref={ (map) => { setMapRef(map) } }
              onDragEnd={ this.handleMapChange }
            >
              {
                !activeTrip
                ? markers
                : null
              }
              {
                (activeStop.lat && !activeTrip)
                  ? <Marker
                  icon={ markerIcon('selected') }
                  position={ {lat: activeStop.lat, lng: activeStop.lon} }
                  onClick={ () => onMarkerClick(activeStop) }
                  options={{ zIndex: 2, scale: 1 }}
                />
                : null
              }
              {
                userPosition
                  ? <Marker
                  icon={ markerIcon('user') }
                  position={ {lat: userPosition.lat, lng: userPosition.lng} }
                  options={{ zIndex: 3, scale: 4 }}
                />
                : null
              }
              {
                activeTrip
                ? <Polyline
                  path={ activeTrip.shape }
                  options={{
                    strokeColor: "#EF382B",
                    strokeWeight: 8,
                    zIndex: 9,
                    icons: this.generateStopIcons()
                  }}
                />
              : null
            }
            {
              arrivals.map(arrival => {
                return (
                  <Polyline
                    key={ arrival.tripId }
                    path={ arrival.shape }
                    options={{
                      strokeColor: "#222222",
                      strokeWeight: 4,
                      strokeOpacity: .25
                    }}
                  />
                )
              })
            }
          </GoogleMap>
        }
      />
    </div>
  )}
};
