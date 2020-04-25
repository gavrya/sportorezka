const loginResolver = require('./login');
const userResolver = require('./user');
const getCategoriesResolver = require('./getCategories');
const getLocationsResolver = require('./getLocations');
const createLocationResolver = require('./createLocation');
const createEventResolver = require('./createEvent');
const updateEventResolver = require('./updateEvent');
const getEventResolver = require('./getEvent');

module.exports = {
  loginResolver,
  userResolver,
  getCategoriesResolver,
  getLocationsResolver,
  createLocationResolver,
  createEventResolver,
  updateEventResolver,
  getEventResolver,
};
