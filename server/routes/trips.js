const router = require('express').Router();
const axios = require('axios');

router.get('/:id', (req, res, next) => {
  axios.get(`http://api.pugetsound.onebusaway.org/api/where/trip-details/${req.params.id}.json?key=${process.env.OBA_KEY}`)
    .then(response => {
      res.send(response.data.data);
    })
    .catch(err => next(err));
});

module.exports = router;
