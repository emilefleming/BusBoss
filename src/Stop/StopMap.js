import React from 'react';

export default function StopMap(props) {
  const { lat, lng } = props;

  return (
    <img
       src={`https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=400x125&maptype=roadmap&markers=color:red%7C${lat},${lng}&style=element:geometry%7Ccolor:0xffffff&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x616161&style=feature:administrative.locality%7Celement:labels%7Cvisibility:off&style=feature:road%7Celement:geometry%7Ccolor:0xffffff&style=feature:road%7Celement:geometry.fill%7Ccolor:0xd3d3d3&style=feature:road%7Celement:labels.text.stroke%7Cvisibility:off&style=feature:road.arterial%7Celement:geometry.fill%7Cweight:2&style=feature:road.highway%7Celement:geometry.fill%7Cweight:4&style=feature:road.local%7Celement:geometry.fill%7Cweight:1&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x929292&style=feature:transit%7Cvisibility:off&style=feature:water%7Celement:geometry%7Ccolor:0xc9c9c9&style=feature:water%7Celement:geometry.fill%7Ccolor:0x515151&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&size=480x360&key=AIzaSyB4XquDbn7LztjowEaAgKvcmiESXMLyMoo`}
      alt={`${stop.name} map`}
    />
  )
}
