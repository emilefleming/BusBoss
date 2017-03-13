import React from 'react';
import { GoogleMapLoader, GoogleMap, Marker, Polyline } from 'react-google-maps';
import './Map.css';
import mapStyles from './mapStyles.json'

export default function Map(props) {
  const { stops, arrivals, onMarkerClick, activeShape } = props
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
            center={{ lat: 47.6062, lng: -122.3321 }}
            defaultOptions={ { styles: mapStyles } }

          >
            {
              stops.map(stop => {
                let url = `/icons/stops/${ stop.direction }.png`
                if (!stop.direction) {
                  url = '/icons/stops/generic.png'
                }
                const icon = {
                  url,
                  size: new window.google.maps.Size(50, 50),
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(25, 25)
                };

                return (
                  <Marker
                    icon={ icon }
                    position={ {lat: stop.lat, lng: stop.lon} }
                    onClick={ () => onMarkerClick(stop) }
                    key={ stop.id }
                  />
                );
              })
            }
            {
              activeShape
                ? <Polyline
                    path={ activeShape }
                    options={{
                      strokeColor: "#EF382B",
                      strokeWeight: 8,
                      zIndex: 2
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
