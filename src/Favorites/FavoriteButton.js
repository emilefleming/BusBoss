import React from 'react';
import Icon from '../Icon/Icon';
import './FavoriteButton.css'

export default function FavoriteButton(props) {
  const { isFavorite, toggleFavorite, stop, trip } = props;
  return (
    <div
      className="FavoriteButton"
      onClick={ () => {toggleFavorite(isFavorite || stop, isFavorite, trip)} }
    >
      <Icon i={ isFavorite ? 'heart' : 'heart-outline' } />
    </div>
  )
}
