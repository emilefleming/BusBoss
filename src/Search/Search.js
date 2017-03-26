import React, { Component } from 'react';
import './Search.css';
import RouteResults from './RouteResults';
import Geosuggest from 'react-geosuggest'

import Icon from '../Icon/Icon'

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    }
    this.selectPlace = this.selectPlace.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleFocus() {
    if (!this.state.searching) {
      this.setState({ searching: true });
    }
  }

  handleChange(query) {
    this.setState({ query })
  }

  selectPlace(place) {
    this.props.centerMap(place.location, 16)
    // goofy fix for suggestions not disappearing on suggest below
    this.geosuggest.clear()
    this.geosuggest.blur()
    this.geosuggest.focus()
    this.geosuggest.blur()
    this.props.toggleView()
    this.handleChange('');
  }

  pickLocation(userPosition) {
    let locationToUse = { lat: 47.6062, lng: -122.3321 }
    if (userPosition) {
      locationToUse = userPosition;
    }

    return new window.google.maps.LatLng(locationToUse)
  }

  render() {
    const { props, state, selectPlace, pickLocation, handleFocus, handleChange } = this;
    const { userPosition, toggleView } = props;
    const { searching, query } = state;
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
          onFocus={ handleFocus }
          onChange={ handleChange }
        />
        {
          searching
          ? <RouteResults query={ query }/>
          : null
        }
      </div>
    )
  }
}
