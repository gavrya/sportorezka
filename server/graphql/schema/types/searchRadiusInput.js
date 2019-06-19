const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLFloat,
} = require('graphql');

const SearchRadiusInputType = new GraphQLInputObjectType({
  name: 'SearchRadiusInput',
  description: 'SearchRadiusInput',
  fields: {
    searchRadius: {
      description: 'Radius in km to limit search by. Maximum: 50.',
      type: new GraphQLNonNull(GraphQLFloat),
    },
    gpsLat: {
      description: 'GPS latitude',
      type: new GraphQLNonNull(GraphQLFloat),
    },
    gpsLng: {
      description: 'GPS longtitude',
      type: new GraphQLNonNull(GraphQLFloat),
    },
  },
});

module.exports = SearchRadiusInputType;
