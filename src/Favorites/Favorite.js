import React from 'react';
import './Favorite.css';
import Arrival from '../Arrival/Arrival';
import Icon from '../Icon/Icon';
import moment from 'moment';

export default function Favorite(props) {
  const { favorite, removeFavorite, history } = props;

  return (
    <div className="Favorite">
      <header
        onClick={ () => { history.push(`/map/stops/${favorite.data.entry.id}`) } }
      >
        {
          favorite.favoriteRouteName
          ? <h2>{ favorite.favoriteRouteName }</h2>
          : null
        }
        <h3>{ favorite.data.entry.name }</h3>
      </header>
      <div className="arrivals">
        {
          favorite.arrivals
            .filter(arrival => {
              if (!favorite.favoriteRoute) {
                return true;
              }

              return arrival.routeId === favorite.favoriteRoute;
            })
            .map(arrival =>
              <Arrival
                arrival={ arrival }
                key={ arrival.tripId }
                lastUpdated={ moment() }
                setHoverTrip={ () => {} }
                setClickedTrip={ () => {} }
              />
            )
        }
      </div>
      <div
        className="close"
        title="Delete Favorite"
        onClick={ () => {removeFavorite(favorite.id)} }>
        <Icon i="close" />
      </div>
    </div>
  )
}
