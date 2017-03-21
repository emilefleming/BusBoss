/* eslint-disable new-cap, arrow-parens */
'use strict';

const router = require('express').Router();
const boom = require('boom');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
const knex = require('../../knex');
const { camelizeKeys } = require('humps');
const ev = require('express-validation');
const validations = require('../validations/token');

router.post('/', ev(validations.post), (req, res, next) => {
  const { email, password } = req.body;

  let user;

  knex('users')
    .where('email', email)
    .first()
    .then(row => {
      if (!row) {
        throw boom.create(400, 'Bad email or password');
      }

      user = camelizeKeys(row);

      return bcrypt.compare(password, user.hashedPassword);
    })
    .then(() => {
      const claim = { userId: user.id };
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '365 days'
      });

      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 3600 * 24 * 365),
        secure: router.get('env') === 'production'
      });

      delete user.hashedPassword;
      res.send(user);
    })
    .catch(bcrypt.MISMATCH_ERROR, () => {
      throw boom.create(400, 'Bad email or password');
    })
    .catch(err => next(err));
});

router.delete('/', (req, res) => {
  res.clearCookie('token');
  res.send({ success: true });
});

module.exports = router;
