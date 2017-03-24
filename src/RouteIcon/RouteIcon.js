import React from 'react';
import Icon from '../Icon/Icon'
import './RouteIcon.css';

export default function RouteIcon({ arrival }) {
  let title = arrival.routeShortName || arrival.routeLongName;
  if (title === 'LINK') {
    title = <div className="link">LINK</div>
  }
  else if (title.match(/Line$/)) {
    title = <div className="brt"><p>{title.slice(0, 1)}</p></div>
  }
  else if (title.match(/^Stcr/)) {
    title = <div className="streetcar"><Icon i="tram" /><div>{title.slice(4)}</div></div>
  }
  else if (arrival.routeId.match(/^95/)) {
    title = <div className="ferry"><Icon i='ferry' /></div>
  }

  return(
    <div className="RouteIcon">
      { title }
    </div>
  )
}
