'use strict';

exports.seed = function(knex) {
  return knex('users_favorites').del()
    .then(() => {
      return knex('users_favorites').insert([
        {
          id: 1,
          user_id: 1,
          stop_id: '1_1552',
          route_id: '23_102638',
          route_name: 123
        },
        {
          id: 2,
          user_id: 1,
          stop_id: '1_1550'
        },
        {
          id: 3,
          user_id: 1,
          stop_id: '1_27210',
          route_id: '1_100161',
          route_name: 27
        }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_favorites_id_seq', (SELECT MAX(id) FROM users_favorites));"
      );
    });
};
