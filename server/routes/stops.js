const router = require('express').Router()
const axios = require('axios');
const decode = require('decode-google-map-polyline');


router.get('/', (req, res, next) => {
  axios.get(`http://api.pugetsound.onebusaway.org/api/where/stops-for-location.json?key=${process.env.OBA_KEY}&lat=47.6062&lon=-122.3321`)
    .then(response => {
      res.send(response.data.data.list)
    })
    .catch(err => next(err));
});

router.get('/:id/arrivals', (req, res, next) => {

  function addShapeToTrip(trip) {
    return new Promise((resolve, reject) => {
      axios.get(`http://api.pugetsound.onebusaway.org/api/where/shape/${trip.shapeId}.json?key=${process.env.OBA_KEY}`)
      .then(response => {
          trip.shape = decode(response.data.data.entry.points)
        resolve(trip)
      })
      .catch(err => {
        console.log(err);
        resolve(trip)
      })
    })
  }

  axios.get(`http://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/${req.params.id}.json?key=${process.env.OBA_KEY}`)
    .then(response => {
      return Promise.all(
        response.data.data.references.trips.map(trip => {
          return addShapeToTrip(trip)
        })
      )
    })
    .then(response => {
      res.send(response);
    })
    .catch(err => next(err));
})

module.exports = router;
