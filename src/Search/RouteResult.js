import React from 'react';
import './RouteResult.css';
import RouteIcon from '../RouteIcon/RouteIcon';

export default function RouteResult(props) {
  const { route } = props;
  const iconObj = {
    routeShortName: route.shortName,
    routeId: route.id
  };

  return(
    <div className="RouteResult">
      <RouteIcon arrival={ iconObj } />
      <div className="description">
        { route.description }
      </div>
    </div>
  )
}
