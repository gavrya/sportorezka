const lodashGet = require('lodash.get');
const lodashHas = require('lodash.has');
const graphqlFields = require('graphql-fields');
const { getLocations } = require('../../../services/location');
const { BadRequest } = require('../../../graphql/errors');
const ServerError = require('../../../graphql/errors/serverError');

const getLocationsResolver = async (parent, args, ctx, info) => {
  const page = lodashGet(args, 'params.pagination.page', 1);
  const pageSize = lodashGet(args, 'params.pagination.pageSize', 100);

  const searchRadius = lodashGet(args, 'params.searchRadius.searchRadius', 5);
  const gpsLat = lodashGet(args, 'params.searchRadius.gpsLat');
  const gpsLng = lodashGet(args, 'params.searchRadius.gpsLng');

  const userId = lodashGet(args, 'params.userId');
  const categoryIds = lodashGet(args, 'params.categoryIds');

  if (page < 1) {
    throw new ServerError(BadRequest, null, ['Invalid pagination.page param']);
  }

  if (pageSize < 1 || pageSize > 1000) {
    throw new ServerError(BadRequest, null, ['Invalid pagination.pageSize param']);
  }

  if (searchRadius && (searchRadius < 1 || searchRadius > 50)) {
    throw new ServerError(BadRequest, null, ['Invalid searchRadius.searchRadius param']);
  }

  const limitByUserId = typeof userId === 'number';
  const limitByCategoryIds = Array.isArray(categoryIds) && categoryIds.length > 0;
  const limitBySearchRadius = typeof searchRadius === 'number' && typeof gpsLat === 'number' && typeof gpsLng === 'number';

  const fields = graphqlFields(info);
  const loadUser = lodashHas(fields, 'items.user');
  const loadCategories = lodashHas(fields, 'items.categories');

  const params = {
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
  };

  const locations = await getLocations(params);

  return locations;
};

module.exports = getLocationsResolver;
