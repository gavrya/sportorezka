/* eslint-disable global-require */
const { Model } = require('objection');

class Event extends Model {
  static get tableName() {
    return 'events';
  }

  static get relationMappings() {
    const User = require('./User');
    const Location = require('./Location');
    const Category = require('./Category');
    const Participant = require('./Participant');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'events.userId',
          to: 'users.id',
        },
      },
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: 'events.categoryId',
          to: 'categories.id',
        },
      },
      location: {
        relation: Model.BelongsToOneRelation,
        modelClass: Location,
        join: {
          from: 'events.locationId',
          to: 'locations.id',
        },
      },
      participants: {
        relation: Model.HasManyRelation,
        modelClass: Participant,
        join: {
          from: 'events.id',
          to: 'participants.eventId',
        },
      },
    };
  }
}

module.exports = Event;
