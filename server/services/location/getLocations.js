const lodashGet = require('lodash.get');
const knex = require('../../database/knex');
const { Location } = require('../../database/models');
const getRadiusSearchParams = require('../../services/radiusSearch');

const getLocations = async (params) => {
  const pageParam = Math.max(lodashGet(params, 'pagination.page', 1), 1);
  const pageSizeParam = Math.min(lodashGet(params, 'pagination.pageSize', 100), 10000);
  const userIdParam = lodashGet(params, 'userId');
  const categoryIdsParam = lodashGet(params, 'categoryIds');
  const limitByUserId = typeof userIdParam === 'number';
  const limitByCategoryIds = Array.isArray(categoryIdsParam) && categoryIdsParam.length > 0;

  const withRelated = ['user', 'categories'];

  const fetchOptions = {
    withRelated,
  };

  const makeQuery = () => {
    const locationsQuery = Location.forge();

    if (limitByUserId) {
      locationsQuery.whereHas('user', q => q.where('id', userIdParam));
    }

    if (limitByCategoryIds) {
      locationsQuery.whereHas('categories', q => q.whereIn('id', categoryIdsParam));
    }

    if (params && params.searchRadius) {
      const searchRadiusParam = Math.min(params.searchRadius.searchRadius, 50);
      const gpsLatParam = params.searchRadius.gpsLat;
      const gpsLngParam = params.searchRadius.gpsLng;

      const radiusSearchParams = getRadiusSearchParams('gpsLat', 'gpsLng', gpsLatParam, gpsLngParam, searchRadiusParam);

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
        .having('distance', '<', searchRadiusParam)
        .orderBy('distance', 'asc')
        .limit(pageSizeParam)
        .offset((pageParam - 1) * pageSizeParam));
    }

    return locationsQuery;
  };

  const locations = await makeQuery().fetchAll(fetchOptions);

  const results = locations.toJSON();

  const data = {
    page: pageParam,
    pageSize: pageSizeParam,
    results,
  };

  return data;
};

module.exports = getLocations;
