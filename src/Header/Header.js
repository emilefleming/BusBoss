import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="Header">
      <div className="navbar">
        <Link to="/"><div className="navItem">Map</div></Link>
        <Link to="/favorites"><div className="navItem">Favorites</div></Link>
        <div className="logo">
          <img src="/icons/logo.svg" alt="Logo"/>
        </div>
        <Link to="/login"><div className="navItem">Login</div></Link>
        <Link to="/"><div className="navItem">Signup</div></Link>
      </div>
    </nav>
  )
}
