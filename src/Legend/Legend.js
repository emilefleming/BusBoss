import React from 'react';
import './Legend.css'

export default function Legend() {
  return (
    <div className="Legend">
      <ul>
        <li>
          <img src='/icons/stops/user.png' alt="Stop icon"/>
          You
        </li>
        <li>
          <img src='/icons/stops/NW.png' alt="User icon"/>
          Bus Stop
        </li>
        <li>
          <img src='/icons/stops/selected.png' alt="Active stop icon"/>
          Active Stop
        </li>
        <li>
          <img src='/icons/stop-on-trip.png' alt="Trip stop icon"/>
          Stop on Trip
        </li>
      </ul>
    </div>
  )
}
