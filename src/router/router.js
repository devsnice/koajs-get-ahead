const Router = require("koa-router");
const apiRouter = require("./apiRouter");

const fs = require("fs");
const path = require("path");

const passport = require("koa-passport");

const router = new Router();

router.get("/", (ctx, next) => {
  ctx.body = "It a root of  application";
});

router.get("/login", ctx => {
  const LoginPage = fs.readFileSync(
    path.join(__dirname, "../templates/login.html")
  );

  ctx.type = "html";
  ctx.body = LoginPage;
});

router.post("/login", async (ctx, next) => {
  await passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  })(ctx, next);
});

router.use("/api", apiRouter.routes());

module.exports = router;
