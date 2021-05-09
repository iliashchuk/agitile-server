import { IMiddleware } from 'koa-router';

import { generateId, setIdPrefix, getGeneratorPrefix } from '../utils/id';

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

export const getIdPrefix: IMiddleware = async (ctx) => {
  ctx.body = await getGeneratorPrefix();
};
