const {
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInputObjectType,
} = require('graphql');

const UpdateEventInputType = new GraphQLInputObjectType({
  name: 'UpdateEventInput',
  description: 'UpdateEventInput',
  fields: {
    locationId: {
      description: 'Location Id',
      type: GraphQLFloat,
    },
    description: {
      description: 'Description',
      type: GraphQLString,
    },
    minParticipants: {
      description: 'Min participants. Min: 1, Max: 100. minParticipants < maxParticipants',
      type: GraphQLFloat,
    },
    maxParticipants: {
      description: 'Max participants. Min: 1, Max: 100. maxParticipants > minParticipants',
      type: GraphQLFloat,
    },
    minAge: {
      description: 'Min age. Min: 10, Max: 100. minAge < maxAge',
      type: GraphQLFloat,
    },
    maxAge: {
      description: 'Max age. Min: 10, Max: 100. maxAge > minAge',
      type: GraphQLFloat,
    },
    isReceptionActive: {
      description: 'Change reception status',
      type: GraphQLBoolean,
    },
    isConfirmed: {
      description: 'Confirm event',
      type: GraphQLBoolean,
    },
    startDate: {
      description: 'Unix timestamp in milliseconds. startDate < endDate and startDate > timestamp',
      type: GraphQLFloat,
    },
    endDate: {
      description: 'Unix timestamp in milliseconds. endDate > startDate and endDate > timestamp',
      type: GraphQLFloat,
    },
  },
});

module.exports = UpdateEventInputType;
