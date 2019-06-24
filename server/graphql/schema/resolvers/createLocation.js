const lodashHas = require('lodash.has');
const graphqlFields = require('graphql-fields');
const { createLocation } = require('../../../services/location');
const { BadRequest } = require('../../../graphql/errors');
const ServerError = require('../../../graphql/errors/serverError');
const checkAuthJwt = require('../../../services/authJwt');

const createLocationResolver = async (parent, args, ctx, info) => {
  const { authJwt } = ctx;

  checkAuthJwt(authJwt);

  const { userId } = authJwt.payload;

  const {
    name,
    description,
    gpsLat,
    gpsLng,
    categoryIds,
  } = args.input;

  if (name.length <= 1 || name.length >= 255) {
    throw new ServerError(BadRequest, null, ['Invalid name param']);
  }

  if (description.length <= 1 || description.length >= 65535) {
    throw new ServerError(BadRequest, null, ['Invalid description param']);
  }

  if (categoryIds.length === 0) {
    throw new ServerError(BadRequest, null, ['Invalid categoryIds param']);
  }

  // todo: check distance between user gps and location gps. Allow max 50 km difference?

  const fields = graphqlFields(info);
  const loadUser = lodashHas(fields, 'user');
  const loadCategories = lodashHas(fields, 'categories');

  const params = {
    userId,
    name,
    description,
    gpsLat,
    gpsLng,
    categoryIds,
    loadUser,
    loadCategories,
  };

  const location = await createLocation(params);

  return location;
};

module.exports = createLocationResolver;
