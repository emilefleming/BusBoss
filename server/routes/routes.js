const router = require('express').Router();
const axios = require('axios');

router.get('/', (req, res, next) => {
  axios.get(`http://api.pugetsound.onebusaway.org/api/where/routes-for-agency/1.json?key=${process.env.OBA_KEY}`)
    .then(response => {
      res.send(response.data.data.list);
    })
    .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
  axios.get(`http://api.pugetsound.onebusaway.org/api/where/stops-for-route/${req.params.id}.json?key=${process.env.OBA_KEY}`)
    .then(response => {
      res.send(response.data.data);
    })
    .catch(err => next(err));
});

module.exports = router;
