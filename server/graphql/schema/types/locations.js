const {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');

const LocationType = require('./location');

const LocationsType = new GraphQLObjectType({
  name: 'Locations',
  description: 'Locations',
  fields: {
    page: {
      description: 'The requested page number',
      type: new GraphQLNonNull(GraphQLFloat),
    },
    pageSize: {
      description: 'The requested page size',
      type: new GraphQLNonNull(GraphQLFloat),
    },
    items: {
      description: 'Found items',
      type: new GraphQLList(LocationType),
    },
  },
});

module.exports = LocationsType;
