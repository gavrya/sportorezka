const { GraphQLNonNull } = require('graphql');
const { LocationType, CreateLocationInputType } = require('../types');
const { createLocationResolver } = require('../resolvers');

const CreateLocationMutation = {
  type: LocationType,
  description: 'Create location',
  args: {
    input: {
      description: 'Input params',
      type: new GraphQLNonNull(CreateLocationInputType),
    },
  },
  resolve: createLocationResolver,
};

module.exports = CreateLocationMutation;
