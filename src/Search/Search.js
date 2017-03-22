import React, { Component } from 'react';
import './Search.css';
import Geosuggest from 'react-geosuggest'

export default class Search extends Component {
  render() {
    return (
      <div className="Search">
        <Geosuggest placeholder="Search..."/>
      </div>
    )
  }
}
