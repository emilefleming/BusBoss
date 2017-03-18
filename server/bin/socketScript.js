const fetchArrivals = require('../util/fetchArrivals');

function socketScript(io) {
  setInterval(updateArrivals, 10000);

  function updateArrivals() {
    const rooms = Object.keys(io.sockets.adapter.rooms);
    console.log(rooms);

    if (rooms) {
      const stops = rooms.filter(room => room.match(/^stop-/))
        .map( stop => {
          const id = stop.slice(5, stop.length);

          fetchArrivals(id)
            .then(response => {
              console.log(response.length);
              io.sockets.in(`stop-${id}`).emit('arrivals', response)
            })
            .catch(err => {console.log(err)})
        })
    }
  }
}


module.exports = socketScript;
