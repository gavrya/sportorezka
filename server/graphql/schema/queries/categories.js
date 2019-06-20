const { CategoriesType } = require('../types');
const { categoriesResolver } = require('../resolvers');

const CategoriesQuery = {
  type: CategoriesType,
  description: 'Get categories',
  resolve: categoriesResolver,
};

module.exports = CategoriesQuery;
