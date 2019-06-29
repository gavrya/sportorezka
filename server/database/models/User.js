/* eslint-disable global-require */
const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    const Location = require('./Location');
    const Event = require('./Event');
    const Participant = require('./Participant');

    return {
      locations: {
        relation: Model.HasManyRelation,
        modelClass: Location,
        join: {
          from: 'users.id',
          to: 'locations.userId',
        },
      },
      events: {
        relation: Model.HasManyRelation,
        modelClass: Event,
        join: {
          from: 'users.id',
          to: 'events.userId',
        },
      },
      participants: {
        relation: Model.HasManyRelation,
        modelClass: Participant,
        join: {
          from: 'users.id',
          to: 'participants.userId',
        },
      },
    };
  }
}

module.exports = User;
