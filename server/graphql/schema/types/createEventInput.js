const {
  GraphQLFloat,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInputObjectType,
} = require('graphql');

const CreateEventInputType = new GraphQLInputObjectType({
  name: 'CreateEventInput',
  description: 'CreateEventInput',
  fields: {
    categoryId: {
      description: 'Category Id',
      type: new GraphQLNonNull(GraphQLFloat),
    },
    locationId: {
      description: 'Location Id',
      type: new GraphQLNonNull(GraphQLFloat),
    },
    description: {
      description: 'Description',
      type: new GraphQLNonNull(GraphQLString),
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
      description: 'Is reception active. Default: true',
      type: GraphQLBoolean,
    },
    startDate: {
      description: 'Unix timestamp in milliseconds. startDate < endDate and startDate > timestamp',
      type: new GraphQLNonNull(GraphQLFloat),
    },
    endDate: {
      description: 'Unix timestamp in milliseconds. endDate > startDate and endDate > timestamp',
      type: new GraphQLNonNull(GraphQLFloat),
    },
  },
});

module.exports = CreateEventInputType;
