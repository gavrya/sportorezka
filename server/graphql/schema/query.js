const { GraphQLObjectType } = require('graphql');
const queries = require('./queries');

const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  fields: {
    login: queries.LoginQuery,
    user: queries.UserQuery,
  },
});

module.exports = QueryType;
