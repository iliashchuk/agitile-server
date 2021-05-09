import { IMiddleware } from 'koa-router';

export const lifeCheck: IMiddleware = (ctx) => {
  ctx.body = 'Server is alive and well.';
};
