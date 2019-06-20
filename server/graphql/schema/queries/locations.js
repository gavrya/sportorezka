const { LocationsType, GetLocationsInputType } = require('../types');
const { locationsResolver } = require('../resolvers');

const LocationsQuery = {
  type: LocationsType,
  description: 'Get locations',
  args: {
    params: {
      description: 'Input params',
      type: GetLocationsInputType,
    },
  },
  resolve: locationsResolver,
};

module.exports = LocationsQuery;
