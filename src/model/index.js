const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'your_database_user',
    password : 'your_database_password',
    filename: 'data',
  },
});

knex('table').insert({a: 'b'}).returning('*').toString();

module.exports = knex