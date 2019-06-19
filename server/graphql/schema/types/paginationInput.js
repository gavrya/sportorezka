const {
  GraphQLInputObjectType,
  GraphQLFloat,
} = require('graphql');

const PaginationInputType = new GraphQLInputObjectType({
  name: 'PaginationInput',
  description: 'PaginationInput',
  fields: {
    page: {
      description: 'Page number. Default: 1.',
      type: GraphQLFloat,
    },
    pageSize: {
      description: 'Number of records per page. Default: 100. Maximum: 10000.',
      type: GraphQLFloat,
    },
  },
});

module.exports = PaginationInputType;
