import React from 'react';
import './RouteResult.css';
import RouteIcon from '../RouteIcon/RouteIcon';

export default function RouteResult(props) {
  const { route, routeProps } = props;
  const iconObj = {
    routeShortName: route.shortName,
    routeId: route.id
  };

  return(
    <div
      className="RouteResult"
      onClick={ () => {routeProps.history.push(`/map/routes/${route.id}`)} }
    >
      <RouteIcon arrival={ iconObj } />
      <div className="description">
        { route.description }
      </div>
    </div>
  )
}
