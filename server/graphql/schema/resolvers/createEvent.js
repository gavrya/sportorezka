const lodashHas = require('lodash.has');
const graphqlFields = require('graphql-fields');
const { createEvent } = require('../../../services/event');
const { BadRequest } = require('../../../graphql/errors');
const ServerError = require('../../../graphql/errors/serverError');
const checkAuthJwt = require('../../../services/authJwt');

const createEventResolver = async (parent, args, ctx, info) => {
  const { authJwt } = ctx;

  checkAuthJwt(authJwt);

  const { userId } = authJwt.payload;

  const {
    categoryId,
    locationId,
    description,
    minParticipants = null,
    maxParticipants = null,
    minAge = null,
    maxAge = null,
    isReceptionActive = true,
    startDate,
    endDate,
  } = args.input;

  if (description.length <= 1 || description.length >= 65535) {
    throw new ServerError(BadRequest, null, ['Invalid description param']);
  }

  if (minParticipants !== null && minParticipants.length <= 0) {
    throw new ServerError(BadRequest, null, ['Invalid minParticipants param']);
  }

  if (maxParticipants !== null && maxParticipants.length >= 100) {
    throw new ServerError(BadRequest, null, ['Invalid maxParticipants param']);
  }

  if (minParticipants !== null && maxParticipants !== null && minParticipants > maxParticipants) {
    throw new ServerError(BadRequest, null, ['Invalid param minParticipants > maxParticipants']);
  }

  if (minAge !== null && minAge.length <= 10) {
    throw new ServerError(BadRequest, null, ['Invalid minAge param']);
  }

  if (maxAge !== null && maxAge.length >= 100) {
    throw new ServerError(BadRequest, null, ['Invalid maxAge param']);
  }

  if (minAge !== null && maxAge !== null && minAge > maxAge) {
    throw new ServerError(BadRequest, null, ['Invalid param minAge > maxAge']);
  }

  const currentTimestamp = Date.now();

  if (startDate < currentTimestamp) {
    throw new ServerError(BadRequest, null, ['Invalid startDate param']);
  }

  if (endDate < currentTimestamp) {
    throw new ServerError(BadRequest, null, ['Invalid endDate param']);
  }

  if (startDate > endDate) {
    throw new ServerError(BadRequest, null, ['Invalid param startDate > endDate']);
  }

  // no more than 7 days
  if ((endDate - startDate) > 604800000) {
    throw new ServerError(BadRequest, null, ['Invalid param startDate - endDate. Duration is more than 7 days']);
  }

  const fields = graphqlFields(info);
  const withUser = lodashHas(fields, 'user');
  const withCategory = lodashHas(fields, 'category');
  const withLocation = lodashHas(fields, 'location');
  const withParticipants = lodashHas(fields, 'participants');

  const params = {
    userId,
    categoryId,
    locationId,
    description,
    minParticipants,
    maxParticipants,
    minAge,
    maxAge,
    isReceptionActive,
    startDate,
    endDate,
    withUser,
    withCategory,
    withLocation,
    withParticipants,
  };

  const event = await createEvent(params);

  return event;
};

module.exports = createEventResolver;
