const Router = require('koa-router');
const apiRouter = require('./apiRouter.js');

const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = 'It a root of  application';
});

router.use('/api', apiRouter.routes());

module.exports = router;
