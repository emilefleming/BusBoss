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
      lines: []
    };
  };

  componentDidMount() {
    axios.get(`/api/stops`)
      .then(response => {
        console.log(response);
        this.setState({
          stops: response.data
        })
      })
      .catch(err => {console.log(err)});
  };

  onMarkerClick(id) {
    axios.get(`/api/stops/${id}/arrivals`)
      .then(response => {
        console.log(1);
        console.log(response);
        this.setState({
          lines: response.data
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

                {this.state.lines.map((line, index) => {
                  return (
                    <Polyline
                      key={index}
                      path={line}
                      options={{
                        strokeColor: "#3972AB",
                        strokeWeight: 10,
                        strokeOpacity: .75
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
