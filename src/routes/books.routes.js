import { Router } from 'express';

import BooksController from '../app/controllers/BooksController';
import auth from '../app/middlewares/auth';
import isAdmin from '../app/middlewares/isAdmin';

const booksRouter = new Router();

booksRouter.get('/', auth, BooksController.index);
booksRouter.post('/', auth, isAdmin, BooksController.create);
booksRouter.patch('/:bookId', auth, isAdmin, BooksController.update);
booksRouter.delete('/:bookId', auth, isAdmin, BooksController.remove);

export default booksRouter;
