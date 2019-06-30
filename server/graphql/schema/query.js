const { GraphQLObjectType } = require('graphql');
const queries = require('./queries');

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    login: queries.LoginQuery,
    user: queries.UserQuery,
    getCategories: queries.GetCategoriesQuery,
    getLocations: queries.GetLocationsQuery,
    getEvent: queries.GetEventQuery,
  },
});

module.exports = QueryType;
