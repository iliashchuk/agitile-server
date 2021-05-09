import Router from 'koa-router';

import { getTickets, createTicket, updateTicket } from './resolvers/ticket';
import { lifeCheck } from './resolvers/lifeCheck';
import { updateIdPrefix, getGeneratedId } from './resolvers/idGenerator';
import { createSprint, getSprints, updateSprint } from './resolvers/sprint';

const router = new Router();

router.get('/ping', lifeCheck);

router.get('/tickets', getTickets);
router.post('/ticket', createTicket);
router.put('/ticket', updateTicket);

router.get('/id', getGeneratedId);
router.put('/id-prefix', updateIdPrefix);

router.get('/sprints', getSprints);
router.post('/sprint', createSprint);
router.put('/sprint', updateSprint);

export default router;
