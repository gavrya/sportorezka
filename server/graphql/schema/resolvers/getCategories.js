const { getCategories } = require('../../../services/category');

const getCategoriesResolver = async () => {
  const categories = await getCategories();

  return categories;
};

module.exports = getCategoriesResolver;
