import { IMiddleware } from 'koa-router';

import { TicketModel, Ticket } from '../models';

export const createTicket: IMiddleware = async (ctx) => {
  const ticketData = <Ticket>ctx.request.body;

  const ticket = new TicketModel(ticketData);
  try {
    await ticket.validate();
  } catch (error) {
    ctx.throw(400, error);
  }

  ctx.body = await ticket.save();
};

export const getTickets: IMiddleware = async (ctx) => {
  ctx.body = await TicketModel.find();
};
