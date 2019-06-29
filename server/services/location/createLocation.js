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
    loadUser,
    loadCategories,
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

    const relations = [];

    if (loadUser) {
      relations.push('user');
    }

    if (loadCategories) {
      relations.push('categories');
    }

    if (relations.length > 0) {
      const relationExpression = `[${relations.join(', ')}]`;

      await location.$loadRelated(relationExpression, null, trx);
    }

    return location;
  });

  return result;
};

module.exports = createLocation;
