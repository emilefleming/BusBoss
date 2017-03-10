'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('stops', table => {
    table.increments();
    table.integer('code');
    table.string('direction');
    table.string('oba_id').notNullable().index();
    table.decimal('lat').notNullable();
    table.decimal('lng').notNullable();
    table.integer('location_type');
    table.string('name');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('stops');
};
