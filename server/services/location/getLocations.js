const { raw } = require('objection');
const { Location } = require('../../database/models');
const getRadiusSearchParams = require('../../services/radiusSearch');

const getLocations = async (params) => {
  const {
    page,
    pageSize,
    searchRadius,
    gpsLat,
    gpsLng,
    userId,
    categoryIds,
    limitByUserId,
    limitByCategoryIds,
    limitBySearchRadius,
    loadUser,
    loadCategories,
  } = params;

  const locations = Location.query();

  if (limitByUserId) {
    locations.whereExists(Location.relatedQuery('user').findById(userId));
  }

  if (limitByCategoryIds) {
    locations.whereExists(Location.relatedQuery('categories').findByIds(categoryIds));
  }

  if (limitBySearchRadius) {
    const radiusSearchParams = getRadiusSearchParams('gpsLat', 'gpsLng', gpsLat, gpsLng, searchRadius);

    const {
      lat1, lat2, lng1, lng2, distanceFormula,
    } = radiusSearchParams;

    locations
      .select('locations.*', raw(distanceFormula).as('distance'))
      .whereBetween('locations.gpsLat', [lat1, lat2])
      .andWhereBetween('locations.gpsLng', [lng1, lng2])
      .having('distance', '<', searchRadius)
      .orderBy('distance', 'asc')
      .limit(pageSize)
      .offset((page - 1) * pageSize);
  } else {
    locations.orderBy('id', 'desc');
  }

  const related = [];

  if (loadUser) {
    related.push('user');
  }

  if (loadCategories) {
    related.push('categories');
  }

  if (related.length > 0) {
    const relations = `[${related.join(', ')}]`;

    locations.eager(relations);
  }

  const items = locations;

  const data = {
    page,
    pageSize,
    items,
  };

  return data;
};

module.exports = getLocations;
