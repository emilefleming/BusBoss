import React from 'react';
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


export default function Map(props) {
  const { stops, arrivals, onMarkerClick, activeTrip, activeStop } = props
  return (
    <div className="Map">
      <GoogleMapLoader
        containerElement={
          <div
            { ...props.containerElementProps }
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
              ? <Marker
                  icon={{
                    url: '/icons/bus.png',
                    size: new window.google.maps.Size(50, 50),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(25, 25)
                  }}
                  position={ {lat: activeTrip.tripStatus.position.lat, lng: activeTrip.tripStatus.position.lon} }
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
                      zIndex: 9
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
  )
};
