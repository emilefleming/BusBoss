import React from 'react';
import './Header.css'

export default function Header() {
  return (
    <nav className="Header">
      <div className="navbar">
        <div className="navItem">Map</div>
        <div className="navItem">Favorites</div>
        <div className="logo">
          <img src="/icons/logo.svg" alt="Logo"/>
        </div>
        <div className="navItem">Login</div>
        <div className="navItem">Signup</div>
      </div>
    </nav>
  )
}
