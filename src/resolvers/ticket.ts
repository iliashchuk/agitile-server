import { IMiddleware } from 'koa-router';

import { generateId } from '../utils/id';
import { TicketModel, Ticket } from '../models';

const generateSubtaskId = async (ticket: Ticket) => {
  if (ticket.subtasks) {
    for (const subtask of ticket.subtasks) {
      if (!subtask._id) {
        subtask._id = await generateId();
      }
    }
  }
};

export const getTickets: IMiddleware = async (ctx) => {
  ctx.body = await TicketModel.find();
};

export const createTicket: IMiddleware = async (ctx) => {
  const ticketInput = <Ticket>ctx.request.body;

  const ticket = new TicketModel(ticketInput);
  try {
    await ticket.validate();
  } catch (error) {
    ctx.throw(400, error);
  }

  ticket._id = await generateId();
  await generateSubtaskId(ticket);
  ctx.body = await ticket.save();
};

export const updateTicket: IMiddleware = async (ctx, next) => {
  const ticketInput = <Ticket>ctx.request.body;

  await generateSubtaskId(ticketInput);

  ctx.body = await TicketModel.findByIdAndUpdate(ticketInput._id, ticketInput, {
    new: true,
  });
};
