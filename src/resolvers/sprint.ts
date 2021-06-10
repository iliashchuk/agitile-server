import { IMiddleware } from 'koa-router';
import { eachDayOfInterval, isAfter } from 'date-fns';

import { SprintModel, Sprint, SprintPopulateDocument } from '../models/Sprint';

export const getSprints: IMiddleware = async (ctx) => {
  ctx.body = await SprintModel.find(ctx.request.query);
  // ctx.body = await SprintModel.find().populate('tickets');
};

export const createSprint: IMiddleware = async (ctx) => {
  const sprintInput = <Sprint>ctx.request.body;

  try {
    const sprint = new SprintModel(sprintInput);
    await sprint.validate();
    ctx.body = await sprint.save();
  } catch (error) {
    ctx.throw(400, error);
  }
};

export const updateSprint: IMiddleware = async (ctx, next) => {
  const sprintInput = <Sprint>ctx.request.body;

  ctx.body = await SprintModel.findByIdAndUpdate(sprintInput._id, sprintInput, {
    new: true,
  });
};

export const getSprintPerformance: IMiddleware = async (ctx) => {
  const sprint = await SprintModel.findOne(ctx.request.query).populate(
    'tickets'
  );

  if (!sprint) {
    ctx.throw({ code: 404 });
    return;
  }

  const {
    startDate,
    endDate,
    tickets,
    name,
  } = (sprint as unknown) as SprintPopulateDocument;

  const sprintDays = eachDayOfInterval({
    start: new Date(startDate),
    end: new Date(endDate),
  });

  const performanceByDay = sprintDays.reduce((performance, date) => {
    const completedSp = tickets.reduce((completedSp, ticket) => {
      if (ticket.completedAt && isAfter(date, new Date(ticket.completedAt))) {
        completedSp += ticket.storyPoints;
      }
      return completedSp;
    }, 0);

    performance[date.toJSON()] = completedSp;
    return performance;
  }, {} as Record<string, number>);

  const totalStoryPoints = tickets.reduce((totalSP, ticket) => {
    totalSP += ticket.storyPoints;
    return totalSP;
  }, 0);

  ctx.body = {
    startDate,
    endDate,
    name,
    totalStoryPoints,
    performanceByDay,
  };
};
