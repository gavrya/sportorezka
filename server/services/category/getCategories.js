const { Category } = require('../../database/models');

const getCategories = async () => {
  const categories = await Category.forge().fetchAll();

  return categories.toJSON();
};

module.exports = getCategories;
