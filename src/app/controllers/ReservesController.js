import { Sequelize } from 'sequelize';

import AppError from '../../errors/AppError';
import dbConfig from '../../config/database';
import Book from '../models/Book';
import BookReserve from '../models/BookReserve';

const sequelize = new Sequelize(dbConfig);

class ReservesController {
  async create(request, response) {
    const transaction = await sequelize.transaction();
    try {
      const { userId } = request.user;
      const { bookId } = request.body;

      const reserve = await BookReserve.findOne({
        where: {
          book_id: bookId,
          user_id: userId,
        },
      });

      if (reserve) {
        throw new AppError('voce ja tem uma reserva para este livro', 409);
      }

      const book = await Book.findByPk(bookId);

      if (!book) {
        throw new AppError('livro não existe', 400);
      }

      if (book.availableUnits < 0) {
        throw new AppError('livro sem unidades disponiveis para reservas', 400);
      }

      await BookReserve.create(
        {
          user_id: userId,
          book_id: bookId,
          returned: false,
        },
        {
          transaction,
        }
      );

      await book.update(
        {
          availableUnits: book.availableUnits - 1,
        },
        { transaction }
      );

      await transaction.commit();
      response.status(201).send();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async index(request, response) {
    const { userId } = request.user;

    const userReserves = await BookReserve.findAll({
      where: {
        user_id: userId,
      },
      include: 'book',
    });

    response.json(userReserves);
  }
}

export default new ReservesController();
