import { IMiddleware } from 'koa-router';

import { TicketModel, Ticket, TicketDocument } from '../models/Ticket';
import { generateProjectDisplayID } from '../models/Project';

const generateSubtaskId = async (ticket: Ticket) => {
  if (ticket.subtasks) {
    const { repo, owner } = ticket;
    for (const subtask of ticket.subtasks) {
      if (!subtask.displayId) {
        subtask.displayId =
          (await generateProjectDisplayID({ repo, owner })) || '';
      }
    }
  }
};

export const getTickets: IMiddleware = async (ctx) => {
  ctx.body = await TicketModel.find(ctx.request.query);
};

export const createTicket: IMiddleware = async (ctx) => {
  const ticketInput = <TicketDocument>ctx.request.body;

  const ticket = new TicketModel(ticketInput);
  try {
    await ticket.validate();
  } catch (error) {
    ctx.throw(400, error);
  }

  const { owner, repo } = ticket;

  ticket.displayId = (await generateProjectDisplayID({ owner, repo })) || '';
  await generateSubtaskId(ticket);
  ctx.body = await ticket.save();
};

export const updateTicket: IMiddleware = async (ctx) => {
  const ticketInput = <TicketDocument>ctx.request.body;

  await generateSubtaskId(ticketInput);

  ctx.body = await TicketModel.findByIdAndUpdate(ticketInput._id, ticketInput, {
    new: true,
  });
};
