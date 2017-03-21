'use strict';

exports.up = knex => knex.schema.createTable('users_favorites', table => {
  table.increments();
  table.integer('user_id').notNullable().references('users.id');
  table.string('stop_id').notNullable();
  table.string('route_id').notNullable();
})

exports.down = knex => knex.schema.dropTable('users_favorites');
