const bookshelf = require('bookshelf');
const eloquentPlugin = require('bookshelf-eloquent');
const knex = require('./knex');

const bookshelfInstance = bookshelf(knex);

bookshelfInstance.plugin('pagination');
bookshelfInstance.plugin(eloquentPlugin);

module.exports = bookshelfInstance;
