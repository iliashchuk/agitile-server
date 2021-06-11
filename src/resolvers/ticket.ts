import { IMiddleware } from 'koa-router';

import { getRandomDateWithinWeekBefore } from '../utils/time';
import {
  TicketModel,
  Ticket,
  TicketDocument,
  TicketStatus,
} from '../models/Ticket';
import { generateProjectDisplayID } from '../models/Project';

const generateAndSetSubtaskIds = async (ticket: Ticket) => {
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
  await generateAndSetSubtaskIds(ticket);
  ctx.body = await ticket.save();
};

export const updateTicket: IMiddleware = async (ctx) => {
  const ticketInput = <TicketDocument>ctx.request.body;

  await generateAndSetSubtaskIds(ticketInput);

  const ticket = await TicketModel.findOne({ _id: ticketInput._id });

  if (!ticket) {
    return;
  }

  if (
    ticket.status !== TicketStatus.Done &&
    ticketInput.status === TicketStatus.Done
  ) {
    ticket.completedAt = getRandomDateWithinWeekBefore().toJSON();
  }

  ticket.set(ticketInput);
  await ticket.save();

  ctx.body = ticket;
};
