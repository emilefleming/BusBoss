import React from 'react';
import Header from '../Header/Header';
import Nearby from '../Nearby/Nearby';
import './Page.css';

export default function Page() {
  return (
    <div className="Page">
      <Header />
      <Nearby />
    </div>
  )
}
