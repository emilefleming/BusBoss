'use strict';

exports.up = knex => knex.schema.createTable('users', table => {
  table.increments();
  table.string('username').notNullable().unique();
  table.string('email').notNullable().unique();
  table.specificType('hashed_password', 'char(60)').notNullable();
  table.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTable('users');
