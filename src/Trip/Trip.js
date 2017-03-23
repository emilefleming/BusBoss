import React from 'react';
import './Trip.css';
import Icon from '../Icon/Icon';

import TripStop from './TripStop';
import Timeliness from '../Timeliness/Timeliness';
import FavoriteButton from '../Favorites/FavoriteButton';

export default function Trip(props) {
  const {
    trip,
    stops,
    setActiveTripStop,
    thisStop,
    toggleView,
    setClickedTrip,
    favorites,
    toggleFavorite
  } = props;
  const { routeShortName, routeLongName, tripStatus, tripHeadsign } = trip;
  const isFavorite = favorites.reduce((acc, favorite) => {
    if (favorite.stopId === thisStop.id && favorite.routeId === trip.routeId) {
      return acc = favorite;
    }
    return acc;
  }, false)

  return (
    <div className="Trip">
      <header>
        <div onClick={ () => { setClickedTrip(null) } }>
          <Icon i="arrow-left" />
        </div>
        <div className="details">
          <h2>
            { routeShortName || routeLongName }
          </h2>
          <h3>{ tripHeadsign }</h3>
          <h4><Timeliness arrival={ trip }/></h4>
        </div>
        <div onClick={ toggleView }>
          <Icon i="map"/>
        </div>
      </header>
      <div
        className="schedule"
        onMouseLeave={ () => { setActiveTripStop(null) } }
      >
        <div className="stops">
          <div className="line"></div>
          {
            stops.map(stop =>
              stop.departure
              ? <TripStop
                key={ stop.id }
                stop={ stop }
                setActiveTripStop={ setActiveTripStop }
                yourStop={ thisStop.id === stop.id }
                >
                  {
                    tripStatus.distanceAlongTrip > stop.departure.distanceAlongTrip
                    ? <div className="stopped"><Icon i="checkbox-marked-circle" /></div>
                    : null
                  }
                </TripStop>
                : null
              )
            }
        </div>
      </div>
      <FavoriteButton
        isFavorite={ isFavorite }
        toggleFavorite={ toggleFavorite }
        stop={ thisStop }
        trip={ trip }
      />
    </div>
  )
}
