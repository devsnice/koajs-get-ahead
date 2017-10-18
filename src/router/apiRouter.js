const Router = require('koa-router');

const apiRouter = new Router();

apiRouter.get('/', (ctx, next) => {
  ctx.body = "It's a route for API of application";
});

module.exports = apiRouter;
