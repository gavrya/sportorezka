const { Model } = require('objection');
const knex = require('../knex');

// Give the knex instance to objection.
Model.knex(knex);

const User = require('./User');
const Category = require('./Category');
const Location = require('./Location');
const LocationCategory = require('./LocationCategory');
const Event = require('./Event');
const Participant = require('./Participant');

module.exports = {
  User,
  Category,
  Location,
  LocationCategory,
  Event,
  Participant,
};
