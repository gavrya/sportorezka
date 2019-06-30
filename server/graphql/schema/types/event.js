const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList,
} = require('graphql');

const UserType = require('./user');
const CategoryType = require('./category');
const LocationType = require('./location');
const ParticipantType = require('./participant');

const EventType = new GraphQLObjectType({
  name: 'Event',
  description: 'Event',
  fields: {
    id: {
      description: 'Id',
      type: new GraphQLNonNull(GraphQLFloat),
    },
    description: {
      description: 'Description',
      type: new GraphQLNonNull(GraphQLString),
    },
    minParticipants: {
      description: 'Min participants',
      type: GraphQLFloat,
    },
    maxParticipants: {
      description: 'Max participants',
      type: GraphQLFloat,
    },
    minAge: {
      description: 'Min age',
      type: GraphQLFloat,
    },
    maxAge: {
      description: 'Max age',
      type: GraphQLFloat,
    },
    isReceptionActive: {
      description: 'Is reception active',
      type: GraphQLBoolean,
    },
    confirmDate: {
      description: 'Unix timestamp in milliseconds',
      type: GraphQLFloat,
    },
    cancelDate: {
      description: 'Unix timestamp in milliseconds',
      type: GraphQLFloat,
    },
    startDate: {
      description: 'Unix timestamp in milliseconds',
      type: new GraphQLNonNull(GraphQLFloat),
    },
    endDate: {
      description: 'Unix timestamp in milliseconds',
      type: new GraphQLNonNull(GraphQLFloat),
    },
    user: {
      description: 'Event creator',
      type: new GraphQLNonNull(UserType),
    },
    category: {
      description: 'Related category',
      type: new GraphQLNonNull(CategoryType),
    },
    location: {
      description: 'Related location',
      type: new GraphQLNonNull(LocationType),
    },
    participants: {
      description: 'Participants',
      type: new GraphQLList(ParticipantType),
    },
  },
});

module.exports = EventType;
