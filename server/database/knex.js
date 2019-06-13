const knex = require('knex');
const knexfile = require('../../knexfile');

const environment = process.env.NODE_ENV;

const knexInstance = knex(knexfile[environment]);

module.exports = knexInstance;
