import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

export default function Header(props) {
  return (
    <nav className="Header">
      <div className="logo" onClick={ props.toggleNav }>
        <h1>BusBoss</h1>
        <img src="/icons/logo.svg" alt="Logo"/>
      </div>
      <div className="navbar">
        <NavLink activeClassName="active" to="/map"><div className="navItem">Map</div></NavLink>
        <NavLink activeClassName="active" to="/favorites"><div className="navItem">Favorites</div></NavLink>
        {
          props.userData
          ? null
          : <NavLink activeClassName="active" to="/login"><div className="navItem">Login</div></NavLink>
        }
        {
          props.userData
          ? <div onClick={ props.logOut } className="navItem logOut">
              Log Out
            </div>
          : <NavLink activeClassName="active" to="/signup"><div className="navItem">Signup</div></NavLink>
        }

      </div>
    </nav>
  )
}
