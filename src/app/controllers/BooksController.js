import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { promisify } from 'util';

import User from '../models/User';
import authConfig from '../../config/auth';
import AppError from '../../errors/AppError';
import Book from '../models/Book';

class BooksController {
  async index(request, response) {
    const { admin } = request.user;

    const books = await Book.findAll({
      include: [
        'gender',
        'author'
      ],
    });

    
    response.json(books);
  }

  async create(request, response) {
    const { userId } = request.user;
    const { name, genderId, authorId, synopsis } = request.body;
    
    const book = await Book.findOne({
      where: {
        name,
      }
    })

    if (book) {
      throw new AppError('ja existe um livro com este nome', 409);
    }

    await Book.create({
      name,
      gender_id: genderId,
      author_id: authorId,
      user_creation_id: userId,
      synopsis,
    })

    response.status(201).send();
  }

  async update(request, response) {
    const { bookId } = request.params;
    const { name, genderId, authorId, synopsis } = request.body;

    const book = await Book.findByPk(bookId);

    if (!book) {
      throw new AppError('livro não encontrado', 404);
    }

    await book.update({
      name, 
      gender_id: genderId, 
      author_id: authorId, 
      synopsis
    })

    response.status(200).send();
  }

  async remove(request, response) {
    const { bookId } = request.params;

    const book = await Book.findByPk(bookId);

    if (!book) {
      throw new AppError('livro não encontrado', 404);
    }

    await book.destroy();

    response.status(204).send();
  }
}

export default new BooksController();
