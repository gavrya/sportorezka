const graphqlHTTP = require('koa-graphql');
const send = require('koa-send');
const schema = require('../schema');
const formatError = require('../errors/formatError');

const getJwtToken = (ctx) => {
  const authHeader = ctx.request.headers.authorization;
  const jwtToken = authHeader && authHeader.toLowerCase().startsWith('bearer ') ? authHeader.substring(7) : null;

  return jwtToken;
};

const graphqlServer = (ctx, next) => {
  console.log(getJwtToken(ctx));

  return graphqlHTTP({
    schema,
    formatError,
    context: ctx,
  })(ctx, next);
};

const graphiqlServer = async (ctx, next) => {
  if (process.env.NODE_ENV !== 'production') {
    await send(ctx, '/server/graphql/server/graphiql.html');
  } else {
    await next();
  }
};

module.exports = {
  graphqlServer,
  graphiqlServer,
};
