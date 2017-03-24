import React from 'react';
import './StopHeader.css';

export default function StopHeader({ name }) {
  let amperIndex;
  let top;
  let bottom;

  if (name) {
    amperIndex = name.indexOf('&')
  }

  if (amperIndex > -1) {
    top = name.slice(0, amperIndex - 1)
    bottom = name.slice(amperIndex + 2);
  }

  return !top && !bottom
  ? <div className="StopHeader">{ name }</div>
  : <div className="StopHeader">
      <div>{ top }</div>
      <span>&</span>
      <div>{ bottom }</div>
    </div>
}
