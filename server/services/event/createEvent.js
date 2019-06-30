const { transaction } = require('objection');
const { Event } = require('../../database/models');

const knex = Event.knex();

const createEvent = async (params) => {
  const {
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
  } = params;

  const timestamp = Date.now();

  const result = await transaction(knex, async (trx) => {
    const eventData = {
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
      createDate: timestamp,
      updateDate: timestamp,
    };

    const event = await Event.query(trx).insertAndFetch(eventData);

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

      await event.$loadRelated(relations, null, trx);
    }

    return event;
  });

  return result;
};

module.exports = createEvent;
