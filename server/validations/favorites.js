'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    stopId: Joi.string()
      .label('Stop ID')
      .required()
  }
};
