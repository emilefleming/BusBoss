import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="Header">
      <div className="navbar">
        <div className="navItem"><Link to="/">Map</Link></div>
        <div className="navItem"><Link to="/favorites">Favorites</Link></div>
        <div className="logo">
          <img src="/icons/logo.svg" alt="Logo"/>
        </div>
        <div className="navItem"><Link to="/">Login</Link></div>
        <div className="navItem"><Link to="/">Signup</Link></div>
      </div>
    </nav>
  )
}
