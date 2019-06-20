const { getCategories } = require('../../../services/category');

const categoriesResolver = async () => {
  const categories = await getCategories();

  return categories;
};

module.exports = categoriesResolver;
