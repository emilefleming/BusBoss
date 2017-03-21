'use strict';

exports.seed = function(knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert(
        {
          id: 1,
          username: 'banana',
          email: 'banana@pudding.com',
          hashed_password: '$2a$12$vk2XWPcTZJmFIUUEyTqywO1n4LJGVaRaFOGFvtmArTqS4c95okcRq'
        }
      );
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      );
    });
};
