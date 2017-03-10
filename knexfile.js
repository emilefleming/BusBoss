'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/oba-clone'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/oba-clone-test'
  }
};
