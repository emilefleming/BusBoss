import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

export default function Header(props) {
  return (
    <nav className="Header">
      <div className="navbar">
        <Link to="/"><div className="navItem">Map</div></Link>
        <Link to="/favorites"><div className="navItem">Favorites</div></Link>
        <div className="logo">
          <img src="/icons/logo.svg" alt="Logo"/>
        </div>
        {
          props.userData
          ? <Link to="/account"><div className="navItem">Account</div></Link>
          : <Link to="/login"><div className="navItem">Login</div></Link>
        }
        {
          props.userData
          ? <div onClick={ props.logOut } className="navItem logOut">
              Log Out
            </div>
          : <Link to="/signup"><div className="navItem">Signup</div></Link>
        }

      </div>
    </nav>
  )
}
