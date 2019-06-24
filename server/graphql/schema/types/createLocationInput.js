const {
  GraphQLList,
  GraphQLFloat,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
} = require('graphql');

const CreateLocationInputType = new GraphQLInputObjectType({
  name: 'CreateLocationInput',
  description: 'CreateLocationInput',
  fields: {
    name: {
      description: 'Name',
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      description: 'Description',
      type: new GraphQLNonNull(GraphQLString),
    },
    gpsLat: {
      description: 'GPS latitude',
      type: new GraphQLNonNull(GraphQLFloat),
    },
    gpsLng: {
      description: 'GPS longtitude',
      type: new GraphQLNonNull(GraphQLFloat),
    },
    categoryIds: {
      description: 'Related category ids',
      type: new GraphQLNonNull(GraphQLList(GraphQLFloat)),
    },
  },
});

module.exports = CreateLocationInputType;
