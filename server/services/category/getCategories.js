const { Category } = require('../../database/models');

const getCategories = async () => {
  const items = await Category.query();

  return {
    items,
  };
};

module.exports = getCategories;
