import React from 'react';
import Arrival from '../Arrival/Arrival';
import './Arrivals.css';
import Icon from '../Icon/Icon';
import Loader from '../Loader/Loader';
import FavoriteButton from '../Favorites/FavoriteButton';
import StopHeader from './StopHeader';

export default function Arrivals(props) {
  const {
    arrivals,
    setHoverTrip,
    setClickedTrip,
    lastUpdated,
    stop,
    animate,
    toggleView,
    favorites,
    toggleFavorite,
    routerProps,
    centerMap,
    loader
  } = props;

  const isFavorite = favorites.reduce((acc, favorite) => {
    if (favorite.stopId === stop.id && !favorite.routeId) {
      return acc = favorite;
    }
    return acc;
  }, false)

  return (
    <div className="Arrivals">
      <header>
        <div onClick={ () => { routerProps.history.push('/map') } }>
          <Icon i="close" />
        </div>
        <div className="details" onClick={() => {centerMap({ lat: stop.lat, lng: stop.lon})}}>
          <StopHeader name={ stop.name } />
        </div>
        <div onClick={ toggleView }>
          <Icon i="map"/>
        </div>
      </header>
      <div className="loader">
        <div className={`loadBar ${animate ? 'loadAnimation' : ''}`}></div>
      </div>
      <div className="arrivalList" onMouseLeave={ () => {setHoverTrip(null)} }>
        {
          arrivals.map(arrival =>
            <Arrival
              key={ arrival.tripId }
              arrival={ arrival }
              setHoverTrip={ setHoverTrip }
              setClickedTrip={ setClickedTrip }
              lastUpdated={ lastUpdated }
            />
          )
        }
        {
          !arrivals.length && !loader
            ? <div className="noArrivals">
                No departures in the next 30 minutes
              </div>
            : null
        }
        {
          loader
          ? <Loader />
          : null
        }
      </div>
      <FavoriteButton
        isFavorite={ isFavorite }
        toggleFavorite={ toggleFavorite }
        stop={ stop }
      />
    </div>
  )
}
