const { transaction } = require('objection');
const { Location, LocationCategory } = require('../../database/models');

const knex = Location.knex();

const createLocation = async (params) => {
  const {
    userId,
    name,
    description,
    gpsLat,
    gpsLng,
    categoryIds,
    withUser,
    withCategories,
  } = params;

  const timestamp = Date.now();

  const result = await transaction(knex, async (trx) => {
    const locationData = {
      userId,
      name,
      description,
      gpsLat,
      gpsLng,
      createDate: timestamp,
      updateDate: timestamp,
    };

    const location = await Location.query(trx).insertAndFetch(locationData);

    const locationId = location.id;

    await Promise.all(
      categoryIds.map(categoryId => LocationCategory.query(trx).insert({ locationId, categoryId })),
    );

    const related = [];

    if (withUser) {
      related.push('user');
    }

    if (withCategories) {
      related.push('categories');
    }

    if (related.length > 0) {
      const relations = `[${related.join(', ')}]`;

      await location.$loadRelated(relations, null, trx);
    }

    return location;
  });

  return result;
};

module.exports = createLocation;
