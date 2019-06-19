const {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLFloat,
} = require('graphql');

const PaginationInputType = require('./paginationInput');
const SearchRadiusInputType = require('./searchRadiusInput');

const GetLocationsInputType = new GraphQLInputObjectType({
  name: 'GetLocationsInput',
  description: 'GetLocationsInput',
  fields: {
    pagination: {
      description: 'Pagination',
      type: PaginationInputType,
    },
    searchRadius: {
      description: 'Search radius',
      type: SearchRadiusInputType,
    },
    userId: {
      description: 'Limit search by user id',
      type: GraphQLFloat,
    },
    categoryIds: {
      description: 'Limit search by category ids',
      type: GraphQLList(GraphQLFloat),
    },
  },
});

module.exports = GetLocationsInputType;
