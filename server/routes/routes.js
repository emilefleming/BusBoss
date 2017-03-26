const router = require('express').Router();
const axios = require('axios');
const oba = 'http://api.pugetsound.onebusaway.org/api/where'

router.get('/', (req, res, next) => {
  axios.get(`${oba}/routes-for-agency/1.json?key=${process.env.OBA_KEY}`)
    .then(response => {
      res.send(response.data.data.list);
    })
    .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
  let route = {};
  axios.get(`${oba}/route/${req.params.id}.json?key=${process.env.OBA_KEY}`)
    .then(response => {
      route = response.data.data.entry

      return axios.get(`${oba}/stops-for-route/${req.params.id}.json?key=${process.env.OBA_KEY}`);
    })
    .then(response => {
      route.stops = response.data.data.references.stops;
      res.send(route);
    })
    .catch(err => next(err));
});

module.exports = router;
