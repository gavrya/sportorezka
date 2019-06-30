const lodashHas = require('lodash.has');
const graphqlFields = require('graphql-fields');
const { getEvent } = require('../../../services/event');

const getEventResolver = async (parent, args, ctx, info) => {
  const { id } = args;

  const fields = graphqlFields(info);
  const withUser = lodashHas(fields, 'user');
  const withCategory = lodashHas(fields, 'category');
  const withLocation = lodashHas(fields, 'location');
  const withParticipants = lodashHas(fields, 'participants');

  const params = {
    id,
    withUser,
    withCategory,
    withLocation,
    withParticipants,
  };

  const event = await getEvent(params);

  return event;
};

module.exports = getEventResolver;
