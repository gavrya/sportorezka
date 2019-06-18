const {
  GraphQLObjectType,
  GraphQLList,
} = require('graphql');

const CategoryType = require('./category');

const CategoriesType = new GraphQLObjectType({
  name: 'Categories',
  description: 'Categories',
  fields: {
    results: {
      description: 'Results',
      type: new GraphQLList(CategoryType),
    },
  },
});

module.exports = CategoriesType;
