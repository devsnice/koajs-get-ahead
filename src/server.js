const Koa = require('koa');
const router = require('./router/router.js');

const app = new Koa();

app.use(router.routes());
app.listen(3030);
