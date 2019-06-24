const { CategoriesType } = require('../types');
const { getCategoriesResolver } = require('../resolvers');

const GetCategoriesQuery = {
  type: CategoriesType,
  description: 'Get categories',
  resolve: getCategoriesResolver,
};

module.exports = GetCategoriesQuery;
