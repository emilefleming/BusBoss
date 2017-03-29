import React from 'react';
import './Loader.css';

export default function Loader() {
  return (
    <div className="Loader">
      <svg className="spinner" viewBox="0 0 6.13 6.13">
        <title>Loading...</title>
        <g>
          <path className="circle" d="M0.9,0.9A3.06,3.06,0,1,0,5.23.9,3.07,3.07,0,0,0,.9.9ZM5,5A2.77,2.77,0,1,1,5,1.1,2.78,2.78,0,0,1,5,5Z"/>
          <polygon className="arrow" points="2.02 4.08 2.6 4.08 2.6 2.8 3.92 4.13 4.13 3.92 2.8 2.6 4.08 2.6 4.08 2.02 2.01 2.01 2.02 4.08"/>
        </g>
      </svg>
    </div>
  )
}
