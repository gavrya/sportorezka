/* eslint-disable no-use-before-define */
const bookshelf = require('../bookshelf');

const User = bookshelf.Model.extend({
  tableName: 'users',
  locations() {
    return this.hasMany(Location, 'userId');
  },
  events() {
    return this.hasMany(Event, 'eventId');
  },
  participants() {
    return this.hasMany(Participant, 'participantId');
  },
});

const SkillLevel = bookshelf.Model.extend({
  tableName: 'skillLevels',
  events() {
    return this.hasMany(Event, 'eventId');
  },
});

const EventStatus = bookshelf.Model.extend({
  tableName: 'eventStatuses',
  events() {
    return this.hasMany(Event, 'eventId');
  },
});

const Category = bookshelf.Model.extend({
  tableName: 'categories',
  locations() {
    return this.belongsToMany(Location, 'locationCategory', 'locationId', 'categoryId');
  },
  events() {
    return this.hasMany(Event, 'eventId');
  },
});

const Location = bookshelf.Model.extend({
  tableName: 'locations',
  user() {
    return this.belongsTo(User, 'userId');
  },
  categories() {
    return this.belongsToMany(Category, 'locationCategory', 'locationId', 'categoryId');
  },
  events() {
    return this.hasMany(Event, 'eventId');
  },
});

const LocationCategory = bookshelf.Model.extend({
  tableName: 'locationCategory',
});

const Event = bookshelf.Model.extend({
  tableName: 'events',
  user() {
    return this.belongsTo(User, 'userId');
  },
  category() {
    return this.belongsTo(Category, 'categoryId');
  },
  location() {
    return this.belongsTo(Location, 'locationId');
  },
  eventStatus() {
    return this.belongsTo(EventStatus, 'eventStatusId');
  },
  skillLevel() {
    return this.belongsTo(SkillLevel, 'skillLevelId');
  },
  participants() {
    return this.hasMany(Participant, 'participantId');
  },
});

const Participant = bookshelf.Model.extend({
  tableName: 'participants',
  user() {
    return this.belongsTo(User, 'userId');
  },
  event() {
    return this.belongsTo(Event, 'eventId');
  },
});

module.exports = {
  User,
  SkillLevel,
  EventStatus,
  Category,
  Location,
  LocationCategory,
  Event,
  Participant,
};
