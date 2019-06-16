const bookshelf = require('bookshelf');
const knex = require('./knex');

const bookshelfInstance = bookshelf(knex);

module.exports = bookshelfInstance;
