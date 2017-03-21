const router = require('express').Router();
const authorize = require('../authorize');
const knex = require('../../knex');
const fetchArrivals = require('../util/fetchArrivals');
const { camelizeKeys } = require('humps');
const axios = require('axios');


router.get('/:id', authorize, (req, res, next) => {
  knex('users_favorites')
    .where('user_id', req.claim.userId)
    .then(response => {
      const favorites = camelizeKeys(response);

      return Promise.all(
        favorites.map(favorite => {
          return new Promise((resolve, reject) => {
            let stop;
            axios.get(`http://api.pugetsound.onebusaway.org/api/where/stop/${favorite.stopId}.json?key=${process.env.OBA_KEY}`)
              .then(stopResponse => {
                stop = stopResponse.data;
                return fetchArrivals(favorite.stopId)
              })
              .then(arrivals => {
                stop.arrivals = arrivals;
                resolve(stop);
              })
              .catch(err => {
                console.log(err);
                resolve(stop);
              })
          })
        })
      );
    })
    .then(favorites => {
      res.send(favorites);
    })
    .catch(err => next(err));
});

module.exports = router;
