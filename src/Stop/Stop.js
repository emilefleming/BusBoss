import React from 'react';
import Arrivals from './Arrivals';
import Trip from '../Trip/Trip';
import Search from '../Search/Search';
import './Stop.css';

export default function Stop(props) {
  const {
    activeStop,
    arrivals,
    stop,
    setHoverTrip,
    setClickedTrip,
    lastUpdated,
    clickedTrip,
    tripStops,
    setActiveTripStop,
    toggleView,
    animate,
    setActiveStop,
    favorites,
    toggleFavorite
  } = props;

  return (
    <div className="Stop">
      {
        activeStop.id && !clickedTrip
        ? <Arrivals
          arrivals={ arrivals }
          setHoverTrip={ setHoverTrip }
          setClickedTrip={ setClickedTrip }
          lastUpdated={ lastUpdated }
          stop={ stop }
          animate={ animate }
          setActiveStop={ setActiveStop }
          toggleView={ toggleView }
          favorites={ favorites }
          toggleFavorite={ toggleFavorite }
        />
        : null
      }
      {
        clickedTrip
        ? <Trip
            trip={ clickedTrip }
            stops={ tripStops }
            setActiveTripStop={ setActiveTripStop }
            thisStop={ stop }
            toggleView={ toggleView }
            setClickedTrip={ setClickedTrip }
            favorites={ favorites }
            toggleFavorite={ toggleFavorite }
          />
        : null
      }
      {
        !activeStop.id
          ? <Search />
          : null
      }
    </div>
  )
}
