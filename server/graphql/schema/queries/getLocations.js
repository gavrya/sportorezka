const { LocationsType, GetLocationsInputType } = require('../types');
const { getLocationsResolver } = require('../resolvers');

const GetLocationsQuery = {
  type: LocationsType,
  description: 'Get locations',
  args: {
    params: {
      description: 'Input params',
      type: GetLocationsInputType,
    },
  },
  resolve: getLocationsResolver,
};

module.exports = GetLocationsQuery;
