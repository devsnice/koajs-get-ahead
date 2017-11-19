const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");

const mongoose = require("./utils/mongoose");

const router = require("./router/router");
const errors = require("./middlewares/errorsMiddleware");
const session = require("./middlewares/sessionMiddleware");
const passport = require("./middlewares/passportMiddleware");

const app = new Koa();

app.keys = ["secret"];
app.use(logger());
app.use(errors);
app.use(session());
app.use(bodyparser());
app.use(passport.initialize());
app.use(passport.session());
app.use(async (ctx, next) => {
  console.log("user is auth, user", ctx.isAuthenticated(), ctx.state.user);

  next();
});
app.use(router.routes());

module.exports = app;
