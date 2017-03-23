const router = require('express').Router()
const axios = require('axios');
const fetchArrivals = require('../util/fetchArrivals');


router.get('/', (req, res, next) => {
  axios.get(`http://api.pugetsound.onebusaway.org/api/where/stops-for-location.json?key=${process.env.OBA_KEY}&lat=${req.query.lat}&lon=${req.query.lng}&latSpan=${req.query.latSpan}&lonSpan=${req.query.lonSpan}&maxCount=250`)
    .then(response => {
      res.send(response.data.data.list)
    })
    .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
  axios.get(`http://api.pugetsound.onebusaway.org/api/where/stop/${req.params.id}.json?key=${process.env.OBA_KEY}`)
    .then(response => {
      res.send(response.data.data.entry)
    })
    .catch(err => next(err))
});

router.get('/:id/arrivals', (req, res, next) => {
  fetchArrivals(req.params.id)
    .then(arrivals => {
      res.send(arrivals)
    })
    .catch(err => next(err));
})

module.exports = router;
