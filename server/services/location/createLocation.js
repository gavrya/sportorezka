const bookshelf = require('../../database/bookshelf');
const { Location, LocationCategory } = require('../../database/models');

const createLocation = (params) => {
  const {
    userId,
    name,
    description,
    gpsLat,
    gpsLng,
    categoryIds,
    loadUser,
    loadCategories,
  } = params;

  const timestamp = Date.now();

  const result = bookshelf.transaction(async (t) => {
    const locationData = {
      userId,
      name,
      description,
      gpsLat,
      gpsLng,
      createDate: timestamp,
      updateDate: timestamp,
    };

    const location = await Location.forge().save(locationData, { transacting: t });

    await categoryIds.map(categoryId => LocationCategory.forge().save({ locationId: location.get('id'), categoryId }, { transacting: t }));

    const relations = [];

    if (loadUser) {
      relations.push('user');
    }

    if (loadCategories) {
      relations.push('categories');
    }

    if (relations.length > 0) {
      await location.load(relations, { transacting: t });
    }

    return location.toJSON();
  });

  return result;
};

module.exports = createLocation;
