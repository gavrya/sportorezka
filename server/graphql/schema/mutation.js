const { GraphQLObjectType, GraphQLString } = require('graphql');

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    hello: {
      type: GraphQLString,
      resolve() {
        return 'world';
      },
    },
  },
});

module.exports = MutationType;
