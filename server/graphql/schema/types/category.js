const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
} = require('graphql');

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  description: 'Category',
  fields: {
    id: {
      description: 'Id',
      type: new GraphQLNonNull(GraphQLFloat),
    },
    name: {
      description: 'Name',
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

module.exports = CategoryType;
