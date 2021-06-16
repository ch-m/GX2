import { Op } from 'sequelize';
import AppError from '../../errors/AppError';
import Author from '../models/Author';
import Book from '../models/Book';
import BookGender from '../models/BookGender';

class BooksController {
  async index(request, response) {
    const { bookName, synopsis, authorId, genderId } = request.query;

    const where = {};

    if (bookName) {
      where.name = { [Op.like]: `%${bookName}%` };
    }
    if (synopsis) {
      where.synopsis = synopsis;
    }
    if (genderId) {
      where.gender_id = genderId;
    }
    if (authorId) {
      where.author_id = authorId;
    }

    const books = await Book.findAll({
      where,
      include: [
        {
          association: 'gender',
        },
        {
          association: 'author',
        },
      ],
    });

    response.json(books);
  }

  async create(request, response) {
    const { userId } = request.user;
    const { name, genderId, authorId, synopsis, numberOfUnits } = request.body;

    const book = await Book.findOne({
      where: {
        name,
      },
    });

    if (book) {
      throw new AppError('ja existe um livro com este nome', 409);
    }

    if (genderId) {
      const gender = await BookGender.findByPk(genderId);

      if (!gender) {
        throw new AppError('genero não existe', 400);
      }
    }

    if (authorId) {
      const author = await Author.findByPk(authorId);

      if (!author) {
        throw new AppError('author não existe', 400);
      }
    }

    await Book.create({
      name,
      gender_id: genderId,
      author_id: authorId,
      user_creation_id: userId,
      numberOfUnits,
      availableUnits: numberOfUnits,
      synopsis,
    });

    response.status(201).send();
  }

  async update(request, response) {
    const { bookId } = request.params;
    const {
      name,
      genderId,
      authorId,
      synopsis,
      numberOfUnits,
      availableUnits,
    } = request.body;

    const book = await Book.findByPk(bookId);

    if (!book) {
      throw new AppError('livro não encontrado', 404);
    }

    if (genderId) {
      const gender = await BookGender.findByPk(genderId);

      if (!gender) {
        throw new AppError('genero não existe', 400);
      }
    }

    if (authorId) {
      const author = await Author.findByPk(authorId);

      if (!author) {
        throw new AppError('author não existe', 400);
      }
    }

    await book.update({
      name,
      gender_id: genderId,
      author_id: authorId,
      numberOfUnits,
      availableUnits,
      synopsis,
    });

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
