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
  console.log(1);
  axios.get(`http://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/${req.params.id}.json?key=${process.env.OBA_KEY}`)
    .then(response => {
      console.log(response);
      res.send(response.data.data);
    })
    .catch(err => next(err));
})

module.exports = router;
