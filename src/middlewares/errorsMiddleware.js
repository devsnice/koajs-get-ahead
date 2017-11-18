const errorsMiddleware = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    let status;

    switch (err.name) {
      case "ValidationError":
        status = 400;
      case "NotFoundError":
        status = 404;
      default:
        status = err.statusCode || err.status || 500;
    }

    ctx.status = status;

    ctx.body = {
      message: err.message
    };
  }
};

module.exports = errorsMiddleware;
