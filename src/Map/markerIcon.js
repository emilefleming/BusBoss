export default function icon(name) {
  let url = `/icons/stops/${ name }.png`

  if (!name) {
    url = '/icons/stops/generic.png'
  }

  return {
    url,
    size: new window.google.maps.Size(50, 50),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(25, 25)
  };
}
