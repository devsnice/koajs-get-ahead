const Koa = require('koa');
const koaBodyparser = require('koa-bodyparser');
const koaLogger = require('koa-logger');

const router = require('./router/router');
const errorsMiddleware = require('./middlewares/errorsMiddleware')

const app = new Koa();

app.use(koaLogger());
app.use(errorsMiddleware);
app.use(koaBodyparser());
app.use(router.routes());

module.exports = app;