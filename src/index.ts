import 'dotenv/config';

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import mongoose from 'mongoose';
import cors from 'koa2-cors';

import { router } from './resolvers';

const PORT = process.env.PORT;

(async function () {
  const app = new Koa();

  await mongoose
    .connect('mongodb://mongo:27017/docker-node-mongo', {
      useNewUrlParser: true,
    })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

  router.get('/ping', async (ctx) => {
    ctx.body = 'pong';
  });

  app.use(cors({ origin: '*' }));
  app.use(bodyParser());
  app.use(logger());

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      console.log(e);

      ctx.status = e.status;
      ctx.body = e;
    }
  });

  app.use(router.routes());

  app
    .listen(PORT, () => {
      console.log(`Listens on port ${PORT}`);
    })
    .on('error', (err) => {
      console.log(err);
    });
})();
