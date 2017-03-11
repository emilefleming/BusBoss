import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, Polyline } from 'react-google-maps';
import axios from 'axios';
import './Map.css';

const io = require('socket.io-client')
const socket = io()

export default class Map extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stops: [],
      arrivals: [],
    };
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
    const { props } = this;
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
                {this.state.stops.map(stop => {
                  return (
                    <Marker
                      position={{lat: stop.lat, lng: stop.lon}}
                      onClick={() => this.onMarkerClick(stop.id)}
                      key={stop.id}
                    />
                  );
                })}

                {this.state.arrivals.map(arrival => {
                  return (
                    <Polyline
                      key={arrival.id}
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
};
