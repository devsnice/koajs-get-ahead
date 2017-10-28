const Router = require("koa-router");
const userController = require("../controllers/userController");

const apiRouter = new Router();

apiRouter.get("/", ctx => {
  ctx.body = "It is a route for API of application";
});

apiRouter.get("/users", async ctx => {
  const { query } = ctx.request.body;

  const users = await userController.get(query);

  ctx.body = users;
});

apiRouter.get("/users/:id", async ctx => {
  const { id } = ctx.params;

  const user = await userController.getById(id);

  ctx.body = user;
});

apiRouter.post("/users", async ctx => {
  const { data } = ctx.request.body;

  const user = await userController.add(data);

  ctx.body = user;
});

apiRouter.delete("/users", async ctx => {
  const { query } = ctx.request.body;
  const user = await userController.delete(query);

  ctx.body = user;
});

apiRouter.delete("/users/:id", async ctx => {
  const { id } = ctx.params;

  const user = await userController.delete({ id });

  ctx.body = user;
});

apiRouter.put("/users/", async ctx => {
  const { query, data } = ctx.request.body;
  const user = await userController.update(query, data);

  ctx.body = user;
});

apiRouter.put("/users/:id", async ctx => {
  const { id } = ctx.params;
  const { data } = ctx.request.body;

  const user = await userController.update({ id }, data);

  ctx.body = user;
});

module.exports = apiRouter;
