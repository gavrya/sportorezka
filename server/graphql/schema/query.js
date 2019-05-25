const { GraphQLObjectType, GraphQLString } = require('graphql');

const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  fields: {
    hello: {
      type: GraphQLString,
      resolve() {
        return 'world';
      },
    },
  },
});

module.exports = QueryType;
