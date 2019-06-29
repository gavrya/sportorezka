/* eslint-disable global-require */
const { Model } = require('objection');

class Participant extends Model {
  static get tableName() {
    return 'participants';
  }

  static get relationMappings() {
    const User = require('./User');
    const Event = require('./Event');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'participants.userId',
          to: 'users.id',
        },
      },
      event: {
        relation: Model.BelongsToOneRelation,
        modelClass: Event,
        join: {
          from: 'participants.eventId',
          to: 'events.id',
        },
      },
    };
  }
}

module.exports = Participant;
