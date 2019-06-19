const { getLocations } = require('../../../services/location');

const locationsResolver = async (parent, args) => {
  const data = await getLocations(args.params);

  return data;
};

module.exports = locationsResolver;
