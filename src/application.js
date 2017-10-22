const Koa = require('koa');
const koaBody = require('koa-body');
const koaLogger = require('koa-logger');

const router = require('./router/router.js');

const app = new Koa();

app.use(koaLogger());
app.use(koaBody());
app.use(router.routes());

module.exports = app;