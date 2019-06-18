const { getCategories } = require('../../../services/category');

const categoriesResolver = async () => {
  const categories = await getCategories();

  return {
    results: categories,
  };
};

module.exports = categoriesResolver;
