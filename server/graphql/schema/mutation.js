const { GraphQLObjectType } = require('graphql');
const mutations = require('./mutations');

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createLocation: mutations.createLocationMutation,
  },
});

module.exports = MutationType;
