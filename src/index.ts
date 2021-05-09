import 'dotenv/config';

import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import mongoose from 'mongoose';
import cors from 'koa2-cors';

const PORT = process.env.PORT;

(async function () {
  const app = new Koa();
  const router = new Router();

  await mongoose
    .connect('mongodb://mongo:27017/docker-node-mongo', {
      useNewUrlParser: true,
    })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

  router.get('/ping', async (ctx) => {
    ctx.body = 'ponss';
  });

  app.use(cors({ origin: '*' }));
  app.use(bodyParser());
  app.use(logger());
  app.use(router.routes());

  app
    .listen(PORT, () => {
      console.log(`Listens on port ${PORT}`);
    })
    .on('error', (err) => {
      console.log(err);
    });
})();
