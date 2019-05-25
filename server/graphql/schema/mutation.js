const { GraphQLObjectType, GraphQLString } = require('graphql');

const MutationType = new GraphQLObjectType({
  name: 'MutationType',
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
