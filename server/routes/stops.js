const router = require('express').Router()
const axios = require('axios');
const decode = require('decode-google-map-polyline');


router.get('/', (req, res, next) => {
  axios.get(`http://api.pugetsound.onebusaway.org/api/where/stops-for-location.json?key=${process.env.OBA_KEY}&lat=${req.query.lat}&lon=${req.query.lng}&latSpan=${req.query.latSpan}&lonSpan=${req.query.lonSpan}&maxCount=250`)
    .then(response => {
      res.send(response.data.data.list)
    })
    .catch(err => next(err));
});

router.get('/:id/arrivals', (req, res, next) => {

  function addShapeToTrip(arrival) {
    return new Promise((resolve, reject) => {
      axios.get(`http://api.pugetsound.onebusaway.org/api/where/shape/${arrival.shapeId}.json?key=${process.env.OBA_KEY}`)
      .then(response => {
          arrival.shape = decode(response.data.data.entry.points)
        resolve(arrival)
      })
      .catch(err => {
        console.log(err);
        resolve(arrival)
      })
    })
  }

  function refactorArrivals(data) {
    return new Promise((resolve, reject) => {
      const shapeIds = data.references.trips.reduce((acc, trip) => {
        acc[trip.id] = trip.shapeId;

        return acc;
      }, {});

      return Promise.all(
        data.entry.arrivalsAndDepartures.map(arrival => {
          arrival.shapeId = shapeIds[arrival.tripId]
          return addShapeToTrip(arrival)
        })
      )
      .then(arrivals => {
        resolve(arrivals);
      })
      .catch(err => {
        console.log(err);
        resolve(arrivals);
      });
    });
  };

  axios.get(`http://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/${req.params.id}.json?key=${process.env.OBA_KEY}`)
    .then(response => {
      return refactorArrivals(response.data.data)
    })
    .then(response => {
      res.send(response);
    })
    .catch(err => next(err));
})

module.exports = router;
