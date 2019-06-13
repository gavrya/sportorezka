const bookshelf = require('bookshelf');
const knex = require('./knex');

const bookshelfInstance = bookshelf(knex);

bookshelfInstance.plugin('bookshelf-camelcase');

module.exports = bookshelfInstance;
