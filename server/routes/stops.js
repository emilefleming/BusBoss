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

router.get('/routes/:id', (req, res, next) => {
  axios.get(`http://api.pugetsound.onebusaway.org/api/where/stop/${req.params.id}.json?key=${process.env.OBA_KEY}`)
    .then(response => {
      return Promise.all(
        response.data.data.entry.routeIds.map(route => {
          return axios.get(`http://api.pugetsound.onebusaway.org/api/where/trips-for-route/${route}.json?key=${process.env.OBA_KEY}`)
        })
      )
    })
    .then(response => {
      const promises = response.map(route => {
        if (!route.data.data.references.trips.length) {
          return null;
        }
        return axios.get(`http://api.pugetsound.onebusaway.org/api/where/shape/${route.data.data.references.trips[0].shapeId}?key=${process.env.OBA_KEY}`)
      })
      return Promise.all(promises)
    })
    .then(responses => {
      const filtered = responses.filter(response => response);
      res.send(filtered.map(response =>
        decode(response.data.data.entry.points)
      ));
    })
    .catch(err => next(err));
})

module.exports = router;
