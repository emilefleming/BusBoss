'use strict';

const request = require('request-promise');
const obaKey = require('../credentials').OBA;
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

request(`http://api.pugetsound.onebusaway.org/api/where/stop-ids-for-agency/1.json?key=${obaKey}`)
  .then(response => {
    console.log(new Date());
    console.log('Stop count: ' + JSON.parse(response).data.list.length);
    return Promise.all(
      JSON.parse(response).data.list.map(stop => {
        return new Promise((resolve, reject) => {
          request(`http://api.pugetsound.onebusaway.org/api/where/stop/${stop}.json?key=${obaKey}`)
            .then(resolve).catch(err => resolve(null))
        })
      })
    )
  })
  .then(response => {
    console.log(new Date());
    console.log('Stop count 2: ' + response.length);
    console.log('Not null: ' + response.filter(stop => stop).length);
    const stops = response.map(stop => {
      if (!stop) {
        console.log(stop);
        return null
      }
      const { code, direction, id, lat, locationType, lon , name } = JSON.parse(stop).data.entry;
      const lng = lon;
      const obaId = id;

      return { code, direction, obaId, lat, locationType, lng, name }
    });

    return knex('stops')
      .insert(decamelizeKeys(stops), '*')
  })
  .then(stops => {
    console.log(new Date());
    console.log('Stop count 3: ' + stops.length);
    process.exit(0);
  })
  .catch(err => console.log(err));
