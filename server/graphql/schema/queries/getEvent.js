const {
  GraphQLNonNull,
  GraphQLFloat,
} = require('graphql');

const { EventType } = require('../types');
const { getEventResolver } = require('../resolvers');

const GetEventQuery = {
  type: EventType,
  description: 'Get event',
  args: {
    id: {
      description: 'Event Id',
      type: new GraphQLNonNull(GraphQLFloat),
    },
  },
  resolve: getEventResolver,
};

module.exports = GetEventQuery;
