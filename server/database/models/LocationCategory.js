const { Model } = require('objection');

class LocationCategory extends Model {
  static get tableName() {
    return 'locationCategory';
  }
}

module.exports = LocationCategory;
