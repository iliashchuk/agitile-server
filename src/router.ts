import Router from 'koa-router';
import { getTickets, createTicket } from './resolvers/ticket';
import { lifeCheck } from './resolvers/lifeCheck';
import { updateIdPrefix, getGeneratedId } from './resolvers/idGenerator';

const router = new Router();

router.get('/ping', lifeCheck);

router.get('/tickets', getTickets);
router.post('/create-ticket', createTicket);

router.get('/id', getGeneratedId);
router.put('/id-prefix', updateIdPrefix);

export default router;
