const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const LoginType = new GraphQLObjectType({
  name: 'LoginType',
  description: 'LoginType',
  fields: {
    jwtToken: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});

module.exports = LoginType;
