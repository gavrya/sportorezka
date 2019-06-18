const { CategoriesType } = require('../types');
const { categoriesResolver } = require('../resolvers');

const CategoriesQuery = {
  type: CategoriesType,
  description: 'Returns all categories',
  resolve: categoriesResolver,
};

module.exports = CategoriesQuery;
