import { IMiddleware } from 'koa-router';

import { SprintModel, Sprint } from '../models/Sprint';

export const getSprints: IMiddleware = async (ctx) => {
  ctx.body = await SprintModel.find().populate('tickets');
};

export const createSprint: IMiddleware = async (ctx) => {
  const sprintInput = <Sprint>ctx.request.body;

  const sprint = new SprintModel(sprintInput);
  try {
    await sprint.validate();
  } catch (error) {
    ctx.throw(400, error);
  }

  ctx.body = await sprint.save();
};

export const updateSprint: IMiddleware = async (ctx, next) => {
  const sprintInput = <Sprint>ctx.request.body;

  ctx.body = await SprintModel.findByIdAndUpdate(sprintInput._id, sprintInput, {
    new: true,
  });
};
