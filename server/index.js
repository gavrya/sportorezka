const Koa = require('koa');
const Router = require('koa-router');
const config = require('config');
const graphqlServer = require('./graphql/server');

const app = new Koa();
const router = new Router();

router.all(config.graphqlUrl, graphqlServer);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.port);
