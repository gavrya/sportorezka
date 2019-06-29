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

  const withRelated = [];

  if (loadUser) {
    withRelated.push('user');
  }

  if (loadCategories) {
    withRelated.push('categories');
  }

  const makeQuery = () => {
    const locationsQuery = Location.query();

    if (limitByUserId) {
      locationsQuery.whereExists(Location.relatedQuery('user').findById(userId));
    }

    if (limitByCategoryIds) {
      locationsQuery.whereExists(Location.relatedQuery('categories').findByIds(categoryIds));
    }

    if (limitBySearchRadius) {
      const radiusSearchParams = getRadiusSearchParams('gpsLat', 'gpsLng', gpsLat, gpsLng, searchRadius);

      const {
        lat1, lat2, lng1, lng2, distanceFormula,
      } = radiusSearchParams;

      locationsQuery
        .select('locations.*', raw(distanceFormula).as('distance'))
        .whereBetween('locations.gpsLat', [lat1, lat2])
        .andWhereBetween('locations.gpsLng', [lng1, lng2])
        .having('distance', '<', searchRadius)
        .orderBy('distance', 'ASC')
        .limit(pageSize)
        .offset((page - 1) * pageSize);
    } else {
      locationsQuery.orderBy('id', 'DESC');
    }

    if (withRelated.length > 0) {
      const relationExpression = `[${withRelated.join(', ')}]`;

      locationsQuery.eager(relationExpression);
    }

    return locationsQuery;
  };

  const locations = await makeQuery();

  const items = locations;

  const data = {
    page,
    pageSize,
    items,
  };

  return data;
};

module.exports = getLocations;
