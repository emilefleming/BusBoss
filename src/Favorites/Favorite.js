import React from 'react';
import './Favorite.css';
import Arrival from '../Arrival/Arrival';
import moment from 'moment';

export default function Favorite(props) {
  const { favorite } = props;
  console.log(favorite);
  return (
    <div className="Favorite">
      <header>
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
    </div>
  )
}
