const graphqlHTTP = require('koa-graphql');
const schema = require('./schema');
const formatError = require('./errors/formatError');

const graphqlServer = graphqlHTTP({
  schema,
  graphiql: true,
  formatError,
});

module.exports = graphqlServer;
