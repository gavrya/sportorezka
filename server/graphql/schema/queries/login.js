const {
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');

const { LoginType } = require('../types');
const { loginResolver } = require('../resolvers');

const LoginQuery = {
  type: LoginType,
  description: 'Returns application JWT token by provided facebook access token',
  args: {
    accessToken: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: loginResolver,
};

module.exports = LoginQuery;
