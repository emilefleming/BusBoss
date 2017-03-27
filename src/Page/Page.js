import React, { Component } from 'react';
import Header from '../Header/Header';
import './Page.css';

export default class Page extends Component {
  constructor(props) {
    super(props)

    this.state = {};

    this.toggleNav = this.toggleNav.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.toggleNav );
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.toggleNav )
  }

  toggleNav(event) {
    if (!event.key && !this.state.navHidden) {
      return this.setState({ navHidden: true })
    }
    if (event.key === 'Escape' && this.state.navHidden) {
      this.setState({ navHidden: false })
    };
  }

  render() {
    const { props, state, toggleNav } = this;
    return (
      <div className="Page">
        {
          state.navHidden
          ? null
          : <Header
              userData={ props.userData }
              logOut={ props.logOut }
              toggleNav={ toggleNav }
            />
        }
        { props.children }
      </div>
    )
  }
}
