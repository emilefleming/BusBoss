import React, { Component } from 'react';
import Header from '../Header/Header';
import './Page.css';

export default class Page extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { props } = this;
    return (
      <div className="Page">
        <Header />
        { props.children }
      </div>
    )
  }
}
