import React from 'react';
import Search from '../Search/Search';
import Legend from '../Legend/Legend';

import './NoStop.css'

export default function NoStop(props) {
  const { userPosition, toggleView, centerMap } = props;

  return (
    <div className="NoStop">
      <Search
        userPosition={ userPosition}
        centerMap={ centerMap }
        toggleView={ toggleView }
      />
      <Legend />
    </div>
  )
}
