/* eslint-disable global-require */
const { Model } = require('objection');

class Category extends Model {
  static get tableName() {
    return 'categories';
  }

  static get relationMappings() {
    const Event = require('./Event');
    const Location = require('./Location');

    return {
      events: {
        relation: Model.HasManyRelation,
        modelClass: Event,
        join: {
          from: 'categories.id',
          to: 'events.categoryId',
        },
      },
      locations: {
        relation: Model.ManyToManyRelation,
        modelClass: Location,
        join: {
          from: 'categories.id',
          through: {
            from: 'locationCategory.categoryId',
            to: 'locationCategory.locationId',
          },
          to: 'locations.id',
        },
      },
    };
  }
}

module.exports = Category;
