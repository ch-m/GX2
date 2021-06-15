import { Router } from 'express';

import AuthorsController from '../app/controllers/AuthorsController';
import auth from '../app/middlewares/auth';
import isAdmin from '../app/middlewares/isAdmin';

const authorsRouter = new Router();

authorsRouter.get('/', auth, AuthorsController.index);
authorsRouter.post('/', auth, isAdmin, AuthorsController.create);
authorsRouter.patch('/:authorId', auth, isAdmin, AuthorsController.update);
authorsRouter.delete('/:authorId', auth, isAdmin, AuthorsController.remove);

export default authorsRouter;
