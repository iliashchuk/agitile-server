import { IMiddleware } from 'koa-router';

import { generateId, setIdPrefix } from '../utils/id';

export const updateIdPrefix: IMiddleware = async (ctx) => {
  const { prefix } = ctx.request.body;
  if (typeof prefix !== 'string') {
    ctx.throw(500, 'ID prefix must be a string');
  }

  ctx.body = await setIdPrefix(prefix);
};

export const getGeneratedId: IMiddleware = async (ctx) => {
  ctx.body = await generateId();
};
