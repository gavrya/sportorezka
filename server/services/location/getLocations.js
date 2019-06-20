const knex = require('../../database/knex');
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
    const locationsQuery = Location.forge();

    if (limitByUserId) {
      locationsQuery.whereHas('user', q => q.where('id', userId));
    }

    if (limitByCategoryIds) {
      locationsQuery.whereHas('categories', q => q.whereIn('id', categoryIds));
    }

    if (limitBySearchRadius) {
      const radiusSearchParams = getRadiusSearchParams('gpsLat', 'gpsLng', gpsLat, gpsLng, searchRadius);

      const {
        lat1, lat2, lng1, lng2, distanceFormula,
      } = radiusSearchParams;

      const distanceSelect = {
        distance: knex.raw(distanceFormula),
      };

      locationsQuery.query(q => q
        .select('locations.*', distanceSelect)
        .whereBetween('locations.gpsLat', [lat1, lat2])
        .andWhereBetween('locations.gpsLng', [lng1, lng2])
        .having('distance', '<', searchRadius)
        .orderBy('distance', 'ASC')
        .limit(pageSize)
        .offset((page - 1) * pageSize));
    } else {
      locationsQuery.orderBy('id', 'DESC');
    }

    return locationsQuery;
  };

  const fetchOptions = {
    withRelated,
  };

  const locations = await makeQuery().fetchAll(fetchOptions);

  const items = locations.toJSON();

  const data = {
    page,
    pageSize,
    items,
  };

  return data;
};

module.exports = getLocations;
