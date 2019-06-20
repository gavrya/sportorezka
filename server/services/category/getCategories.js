const { Category } = require('../../database/models');

const getCategories = async () => {
  const categories = await Category.forge().fetchAll();

  const items = categories.toJSON();

  return {
    items,
  };
};

module.exports = getCategories;
