'use strict';

const request = require('request-promise');
const obaKey = require('../credentials').OBA;

request(`http://api.pugetsound.onebusaway.org/api/where/stop-ids-for-agency/1.json?key=${obaKey}`)
  .then(response => {
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
    response.map(stop => {
      if (!stop) {
        return null
      }
      const { code, direction, id, lat, locationType, lon , name } = JSON.parse(stop).data.entry;
      const lng = lon;
      const obj = { code, direction, id, lat, locationType, lng, name }
      console.log(obj);
    });
  })
  .catch(err => console.log(err));
