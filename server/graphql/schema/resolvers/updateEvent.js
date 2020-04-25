const lodashHas = require('lodash.has');
const graphqlFields = require('graphql-fields');
const { createEvent } = require('../../../services/event');
const { BadRequest } = require('../../../graphql/errors');
const ServerError = require('../../../graphql/errors/serverError');
const checkAuthJwt = require('../../../services/authJwt');

const updateEventResolver = async (parent, args, ctx, info) => {
  const { authJwt } = ctx;

  checkAuthJwt(authJwt);

  const { userId } = authJwt.payload;

  const eventId = args.id;

  // throw an error if the event with eventId was cancelled

  const {
    locationId,
    description,
    minParticipants,
    maxParticipants,
    minAge,
    maxAge,
    isReceptionActive,
    startDate,
    endDate,
  } = args.input;

  if (Object.keys(args.input).length === 0) {
    throw new ServerError(BadRequest, null, ['Invalid input params']);
  }

  if (description === null) {
    throw new ServerError(BadRequest, null, ['Invalid description param']);
  }

  if (typeof description === 'string' && (description.length <= 1 || description.length >= 65535)) {
    throw new ServerError(BadRequest, null, ['Invalid description param']);
  }

  if (typeof minParticipants === 'number' && minParticipants.length <= 0) {
    throw new ServerError(BadRequest, null, ['Invalid minParticipants param']);
  }

  if (typeof maxParticipants === 'number' && maxParticipants.length >= 100) {
    throw new ServerError(BadRequest, null, ['Invalid maxParticipants param']);
  }

  if (typeof minParticipants === 'number' && typeof maxParticipants === 'number' && minParticipants > maxParticipants) {
    throw new ServerError(BadRequest, null, ['Invalid param minParticipants > maxParticipants']);
  }

  // get number of event participants and check: maxParticipants >= number

  if (typeof minAge === 'number' && minAge.length <= 10) {
    throw new ServerError(BadRequest, null, ['Invalid minAge param']);
  }

  if (typeof maxAge === 'number' && maxAge.length >= 100) {
    throw new ServerError(BadRequest, null, ['Invalid maxAge param']);
  }

  if (typeof minAge === 'number' && typeof maxAge === 'number' && minAge > maxAge) {
    throw new ServerError(BadRequest, null, ['Invalid param minAge > maxAge']);
  }

  if (typeof isReceptionActive !== 'boolean') {
    throw new ServerError(BadRequest, null, ['Invalid isReceptionActive param']);
  }

  const currentTimestamp = Date.now();

  if (startDate === null) {
    throw new ServerError(BadRequest, null, ['Invalid startDate param']);
  }

  if (typeof startDate === 'number' && startDate < currentTimestamp) {
    throw new ServerError(BadRequest, null, ['Invalid startDate param']);
  }

  if (endDate === null) {
    throw new ServerError(BadRequest, null, ['Invalid endDate param']);
  }

  if (typeof endDate === 'number' && endDate <= currentTimestamp) {
    throw new ServerError(BadRequest, null, ['Invalid endDate param']);
  }

  if (typeof startDate === 'number' && typeof endDate === 'number') {
    if (startDate > endDate) {
      throw new ServerError(BadRequest, null, ['Invalid param startDate > endDate']);
    }

    // no more than 7 days
    if ((endDate - startDate) > 604800000) {
      throw new ServerError(BadRequest, null, ['Invalid params (startDate - endDate). Duration is more than 7 days']);
    }
  }

  const fields = graphqlFields(info);
  const withUser = lodashHas(fields, 'user');
  const withCategory = lodashHas(fields, 'category');
  const withLocation = lodashHas(fields, 'location');
  const withParticipants = lodashHas(fields, 'participants');

  const params = {
    userId,
    eventId,
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

module.exports = updateEventResolver;
