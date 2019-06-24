const loginResolver = require('./login');
const userResolver = require('./user');
const getCategoriesResolver = require('./getCategories');
const getLocationsResolver = require('./getLocations');
const createLocationResolver = require('./createLocation');

module.exports = {
  loginResolver,
  userResolver,
  getCategoriesResolver,
  getLocationsResolver,
  createLocationResolver,
};
