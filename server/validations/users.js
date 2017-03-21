'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(12)
      .trim()
      .required(),
    email: Joi.string()
      .label('Email')
      .email()
      .trim()
      .required(),
    password: Joi.string()
      .label('Password')
      .min(8)
      .trim()
      .required(),
  }
};
