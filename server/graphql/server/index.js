const graphqlHTTP = require('koa-graphql');
const send = require('koa-send');
const schema = require('../schema');
const formatError = require('../errors/formatError');
const { verifyJwtToken } = require('../../services/jwt');

const getJwtToken = (ctx) => {
  const authHeader = ctx.request.headers.authorization;
  const jwtToken = authHeader && authHeader.toLowerCase().startsWith('bearer ') ? authHeader.substring(7) : null;

  return jwtToken;
};

const getAuthJwt = (jwtToken) => {
  if (!jwtToken) {
    return null;
  }

  const authJwt = verifyJwtToken(jwtToken);

  return authJwt;
};

const getContext = (ctx) => {
  const jwtToken = getJwtToken(ctx);
  const authJwt = getAuthJwt(jwtToken);

  const context = {
    ...ctx,
    authJwt,
  };

  return context;
};

const graphqlServer = (ctx, next) => {
  const context = getContext(ctx);

  return graphqlHTTP({
    schema,
    formatError,
    context,
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
