'use strict';

const boom = require('boom');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }

    req.claim = payload;
    next();
  });
};
