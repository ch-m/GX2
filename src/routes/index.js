import { Router } from 'express';
import authorsRouter from './authors.routes';

import booksRouter from './books.routes';
import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';

const routes = new Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/books', booksRouter);
routes.use('/authors', authorsRouter);

export default routes
