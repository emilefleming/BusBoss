import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, Polyline } from 'react-google-maps';
import './Map.css';
import mapStyles from './mapStyles.json'

function icon(direction) {
  let url = `/icons/stops/${ direction }.png`

  if (!direction) {
    url = '/icons/stops/generic.png'
  }

  return {
    url,
    size: new window.google.maps.Size(50, 50),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(25, 25)
  };
}


export default class Map extends Component {
  render() {
    console.log('MAP RENDERED');
    const {
      stops,
      arrivals,
      onMarkerClick,
      activeTrip,
      activeStop,
      setClickedTrip,
      bounds
    } = this.props
    return (
      <div className="Map" onClick={ () => {setClickedTrip(null)} }>
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
              defaultZoom={16}
              defaultOptions={{
                styles: mapStyles,
                center: { lat: 47.6062, lng: -122.3321 }
              }}
              ref={ (map) => { if (bounds && map) { map.fitBounds(bounds)}} }
            >
                {
                  !activeTrip
                  ? stops.map(stop => {
                    return (
                      <Marker
                        icon={ icon(stop.direction) }
                        position={ {lat: stop.lat, lng: stop.lon} }
                        onClick={ () => onMarkerClick(stop) }
                        key={ stop.id }
                        options={{
                          zIndex: 1
                        }}
                      />
                    );
                  })
                  : null
                }
                {
                  activeStop.lat
                  ? <Marker
                  icon={ icon(activeStop.direction) }
                  position={ {lat: activeStop.lat, lng: activeStop.lon} }
                  onClick={ () => onMarkerClick(activeStop) }
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
                    icons: [{
                      icon: {
                        path: 'M20,10c0,5.5-4.5,10-10,10S0,15.5,0,10S4.5,0,10,0S20,4.5,20,10z',
                        fillOpacity: 1,
                        fillColor: 'white',
                        strokeWeight: 2,
                        strokeColor: '#EF382B',
                        strokeOpacity: 1,
                        scale: 1,
                        anchor: new window.google.maps.Point(10, 10)
                      },
                      offset: `${( activeTrip.tripStatus.distanceAlongTrip / activeTrip.tripStatus.totalDistanceAlongTrip ) * 100}%`
                    }]
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