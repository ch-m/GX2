import { Router } from 'express';

import ReservesController from '../app/controllers/ReservesController';
import ReturnBookController from '../app/controllers/ReturnBookController';
import auth from '../app/middlewares/auth';
import isUser from '../app/middlewares/isUser';

const reservesRouter = new Router();

reservesRouter.post('/', auth, isUser, ReservesController.create);
reservesRouter.get('/', auth, isUser, ReservesController.index);

reservesRouter.post(
  '/:reserveId/return-book',
  auth,
  isUser,
  ReturnBookController.create
);

export default reservesRouter;
