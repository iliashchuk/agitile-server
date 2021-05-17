import Router from 'koa-router';

import { getTickets, createTicket, updateTicket } from './resolvers/ticket';
import { lifeCheck } from './resolvers/lifeCheck';
import {
  updateIdPrefix,
  getGeneratedId,
  getIdPrefix,
} from './resolvers/idGenerator';
import {
  createSprint,
  getSprintPerformance,
  getSprints,
  updateSprint,
} from './resolvers/sprint';
import { createProject, getProject } from './resolvers/project';
import { getGithubAccessTokenFromCode } from './resolvers/githubToken';

const router = new Router();

router.get('/ping', lifeCheck);

router.get('/project', getProject);
router.post('/project', createProject);

router.get('/tickets', getTickets);
router.post('/ticket', createTicket);
router.put('/ticket', updateTicket);

router.get('/id', getGeneratedId);
router.get('/id-prefix', getIdPrefix);
router.put('/id-prefix', updateIdPrefix);

router.get('/sprints', getSprints);
router.get('/sprint-performance', getSprintPerformance);
router.post('/sprint', createSprint);
router.put('/sprint', updateSprint);

router.post('/github-token', getGithubAccessTokenFromCode);

export default router;
