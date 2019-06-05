const Koa = require('koa');
const Router = require('koa-router');
const helmet = require('koa-helmet');
const config = require('config');
const { graphiqlServer, graphqlServer } = require('./graphql/server');

const app = new Koa();
const router = new Router();

router.get(config.graphqlUrl, graphiqlServer);
router.post(config.graphqlUrl, graphqlServer);

app.use(helmet());
app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
