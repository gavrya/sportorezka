const { GraphQLNonNull, GraphQLFloat } = require('graphql');
const { EventType, UpdateEventInputType } = require('../types');
const { updateEventResolver } = require('../resolvers');

const UpdateEventMutation = {
  type: EventType,
  description: 'Update event',
  args: {
    id: {
      description: 'Event Id',
      type: new GraphQLNonNull(GraphQLFloat),
    },
    input: {
      description: 'Input params',
      type: new GraphQLNonNull(UpdateEventInputType),
    },
  },
  resolve: updateEventResolver,
};

module.exports = UpdateEventMutation;
