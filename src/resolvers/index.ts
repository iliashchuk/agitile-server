import Router from 'koa-router';

import { createTicket, getTickets } from './ticket';
import { lifeCheck } from './lifeCheck';

export const router = new Router();

router.get('/ping', lifeCheck);
router.get('/tickets', getTickets);
router.post('/create-ticket', createTicket);
