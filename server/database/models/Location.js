/* eslint-disable global-require */
const { Model } = require('objection');

class Location extends Model {
  static get tableName() {
    return 'locations';
  }

  static get relationMappings() {
    const User = require('./User');
    const Event = require('./Event');
    const Category = require('./Category');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'locations.userId',
          to: 'users.id',
        },
      },
      categories: {
        relation: Model.ManyToManyRelation,
        modelClass: Category,
        join: {
          from: 'locations.id',
          through: {
            from: 'locationCategory.locationId',
            to: 'locationCategory.categoryId',
          },
          to: 'categories.id',
        },
      },
      events: {
        relation: Model.HasManyRelation,
        modelClass: Event,
        join: {
          from: 'locations.id',
          to: 'events.locationId',
        },
      },
    };
  }
}

module.exports = Location;
