/* eslint-disable no-underscore-dangle */
const knex = require('knex');
const knexfile = require('../../knexfile');

const environment = process.env.NODE_ENV;

const knexInstance = knex(knexfile[environment]);

if (environment === 'development') {
  knexInstance.on('query', (query) => {
    console.time(query.__knexQueryUid);
  });

  knexInstance.on('query-response', (response, query) => {
    console.log('---QUERY---');
    console.log('');
    console.log(knexInstance.raw(query.sql, query.bindings).toString());
    console.log('');
    console.log(JSON.stringify(response, null, 2));
    console.log('');
    console.timeEnd(query.__knexQueryUid);
    console.log('');
    console.log('---QUERY OK---');
    console.log('');
  });

  knexInstance.on('query-error', (error, query) => {
    console.log('---QUERY---');
    console.log('');
    console.log(knexInstance.raw(query.sql, query.bindings).toString());
    console.log('');
    console.log(error);
    console.log('');
    console.timeEnd(query.__knexQueryUid);
    console.log('');
    console.log('---QUERY ERROR---');
    console.log('');
  });
}

module.exports = knexInstance;
