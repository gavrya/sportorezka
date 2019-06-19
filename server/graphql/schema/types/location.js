const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
} = require('graphql');

const UserType = require('./user');
const CategoryType = require('./category');

const LocationType = new GraphQLObjectType({
  name: 'Location',
  description: 'Location',
  fields: {
    id: {
      description: 'Id',
      type: new GraphQLNonNull(GraphQLFloat),
    },
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
    createDate: {
      description: 'Unix timestamp in milliseconds',
      type: new GraphQLNonNull(GraphQLFloat),
    },
    updateDate: {
      description: 'Unix timestamp in milliseconds',
      type: new GraphQLNonNull(GraphQLFloat),
    },
    user: {
      description: 'Location creator info',
      type: new GraphQLNonNull(UserType),
    },
    categories: {
      description: 'Categories to which this location is belongs to',
      type: new GraphQLList(CategoryType),
    },
  },
});

module.exports = LocationType;
