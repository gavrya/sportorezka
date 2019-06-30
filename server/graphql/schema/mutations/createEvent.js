const { GraphQLNonNull } = require('graphql');
const { EventType, CreateEventInputType } = require('../types');
const { createEventResolver } = require('../resolvers');

const CreateEventMutation = {
  type: EventType,
  description: 'Create event',
  args: {
    input: {
      description: 'Input params',
      type: new GraphQLNonNull(CreateEventInputType),
    },
  },
  resolve: createEventResolver,
};

module.exports = CreateEventMutation;
