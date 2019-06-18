const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
} = require('graphql');

const UserType = new GraphQLObjectType({
  name: 'UserType',
  description: 'UserType',
  fields: {
    id: {
      description: 'Id',
      type: new GraphQLNonNull(GraphQLFloat),
    },
    name: {
      description: 'Name',
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      description: 'Email',
      type: new GraphQLNonNull(GraphQLString),
    },
    avatarUrl: {
      description: 'Avatar url',
      type: new GraphQLNonNull(GraphQLString),
    },
    createDate: {
      description: 'Unix timestamp in milliseconds',
      type: new GraphQLNonNull(GraphQLFloat),
    },
    updateDate: {
      description: 'Unix timestamp in milliseconds',
      type: new GraphQLNonNull(GraphQLFloat),
    },
  },
});

module.exports = UserType;
