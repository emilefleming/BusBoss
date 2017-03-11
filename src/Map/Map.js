import React from 'react';
import { GoogleMapLoader, GoogleMap, Marker, Polyline } from 'react-google-maps';
import './Map.css';

export default function Map(props) {
  const { stops, arrivals, onMarkerClick } = props
  return (
    <div className="Map">
      <GoogleMapLoader
        containerElement={
          <div
            {...props.containerElementProps}
            style={{
              height: "100%",
            }}
          />
        }
        googleMapElement={
          <GoogleMap
            defaultZoom={16}
            center={{ lat: 47.6062, lng: -122.3321 }}
          >
            {stops.map(stop => {
              return (
                <Marker
                  position={{lat: stop.lat, lng: stop.lon}}
                  onClick={() => onMarkerClick(stop.id)}
                  key={stop.id}
                />
              );
            })}

            {arrivals.map(arrival => {
              return (
                <Polyline
                  key={arrival.tripId}
                  path={arrival.shape}
                  options={{
                    strokeColor: "black",
                    strokeWeight: 6,
                    strokeOpacity: .25
                  }}
                />
              )
            })}
          </GoogleMap>
        }
      />
    </div>
  )
};
