const {
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLObjectType,
} = require('graphql');

const UserType = require('./user');

const ParticipantType = new GraphQLObjectType({
  name: 'Participant',
  description: 'Participant',
  fields: {
    joinDate: {
      description: 'Unix timestamp in milliseconds',
      type: new GraphQLNonNull(GraphQLFloat),
    },
    user: {
      description: 'User',
      type: new GraphQLNonNull(UserType),
    },
  },
});

module.exports = ParticipantType;
