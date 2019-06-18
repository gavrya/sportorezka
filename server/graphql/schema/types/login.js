const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const LoginType = new GraphQLObjectType({
  name: 'Login',
  description: 'Login',
  fields: {
    jwtToken: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});

module.exports = LoginType;
