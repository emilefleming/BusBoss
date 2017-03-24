import React, { Component } from 'react';
import './Search.css';
import Geosuggest from 'react-geosuggest'

import Icon from '../Icon/Icon'

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.selectPlace = this.selectPlace.bind(this);
  }

  selectPlace(place) {
    this.props.centerMap(place.location, 16)
    // .goofy fix for suggestions not disappearing on suggest below
    this.geosuggest.clear()
    this.geosuggest.blur()
    this.geosuggest.focus()
    this.geosuggest.blur()
    this.props.toggleView()
  }

  pickLocation(userPosition) {
    let locationToUse = { lat: 47.6062, lng: -122.3321 }
    if (userPosition) {
      locationToUse = userPosition;
    }

    return new window.google.maps.LatLng(locationToUse)
  }

  render() {
    const { props, selectPlace, pickLocation } = this;
    const { userPosition, toggleView } = props;
    return (
      <div className="Search">
        <header>
          <div>
          </div>
          <div className="details">
            <h2>Places</h2>
          </div>
          <div onClick={ toggleView }>
            <Icon i="map"/>
          </div>
        </header>
        <Geosuggest
          ref={ el => this.geosuggest = el }
          placeholder="Search..."
          location={ pickLocation(userPosition) }
          radius="300"
          country="us"
          onSuggestSelect={ selectPlace }
        />
      </div>
    )
  }
}
