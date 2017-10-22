const Router = require('koa-router');
const userController = require('../controllers/userController');

const apiRouter = new Router();

apiRouter.get('/', (ctx, next) => {
  ctx.body = "It's a route for API of application";
});

apiRouter.get('/users', async (ctx, next) => {
  const users = await userController.getAll();

  ctx.body = users;
});

apiRouter.post('/users', (ctx, next) => {
  ctx.body = "Add a new user";
});

apiRouter.get('/users/:id', (ctx, next) => {
  ctx.body = "Get an user by id";
});

apiRouter.delete('/users/:id', (ctx, next) => {
  ctx.body = "Delete an user by id";
});

apiRouter.put('/users/:id', (ctx, next) => {
  ctx.body = "Change an user by id";
});


module.exports = apiRouter;
