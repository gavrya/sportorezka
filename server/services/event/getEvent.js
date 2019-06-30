const { Event } = require('../../database/models');

const getEvent = async (params) => {
  const {
    id,
    withUser,
    withCategory,
    withLocation,
    withParticipants,
  } = params;

  const event = await Event.query().findById(id);

  const related = [];

  if (withUser) {
    related.push('user');
  }

  if (withCategory) {
    related.push('category');
  }

  if (withLocation) {
    related.push('location');
  }

  if (withParticipants) {
    related.push('participants');
  }

  if (related.length > 0) {
    const relations = `[${related.join(', ')}]`;

    await event.$loadRelated(relations);
  }

  return event;
};

module.exports = getEvent;
