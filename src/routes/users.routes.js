import { Router } from 'express';

import UsersController from '../app/controllers/UsersController';
import auth from '../app/middlewares/auth';
import isAdmin from '../app/middlewares/isAdmin';

const usersRouter = new Router();

usersRouter.get('/', auth, isAdmin, UsersController.index);
usersRouter.post('/', auth, isAdmin, UsersController.create);
usersRouter.patch('/:userId', auth, isAdmin, UsersController.update);
usersRouter.delete('/:userId', auth, isAdmin, UsersController.remove);

export default usersRouter;
