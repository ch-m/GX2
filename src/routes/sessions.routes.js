import { Router } from 'express';

import SessionController from '../app/controllers/SessionController';

const sessionsRouter = new Router();

sessionsRouter.post('/', SessionController.create);

export default sessionsRouter;
