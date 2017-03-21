const router = require('express').Router();
const boom = require('boom');
const { camelizeKeys, decamelizeKeys } = require('humps');
const ev = require('express-validation');
const validations = require('../validations/users')
const knex = require('../../knex');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');

router.post('/', ev(validations.post), (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    return next(boom.create(400, 'Passwords do not match'))
  }

  knex('users')
    .where('email', req.body.email)
    .first()
    .then((row) => {
      if (row) {
        throw boom.create(400, 'Email is already registered');
      }

      return knex('users')
        .where('username', req.body.username)
        .first();
    })
    .then((row) => {
      if (row) {
        throw boom.create(400, 'Username is already registered');
      }

      return bcrypt.hash(req.body.password, 12);
    })
    .then((hashedPassword) => {
      const { username, email } = req.body;
      const user = { username, email, hashedPassword };

      return knex('users')
        .insert(decamelizeKeys(user), '*');
    })
    .then((users) => {
      const user = camelizeKeys(users[0]);
      const payload = {
        userId: user.id
      };

      const token = jwt.sign(payload, process.env.JWT_KEY, {
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
    .catch(err => next(err));
});

module.exports = router;
