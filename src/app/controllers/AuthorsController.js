import AppError from '../../errors/AppError';
import Author from '../models/Author';

class AuthorsController {
  async index(request, response) {
    const authors = await Author.findAll();

    response.json(authors);
  }

  async create(request, response) {
    const { name } = request.body;

    const author = await Author.findOne({
      where: {
        name,
      },
    });

    if (author) {
      throw new AppError('ja existe um autor com este nome', 409);
    }

    await Author.create({ name });

    response.status(201).send();
  }

  async update(request, response) {
    const { authorId } = request.params;
    const { name } = request.body;

    const author = await Author.findByPk(authorId);

    if (!author) {
      throw new AppError('autor não encontrado', 404);
    }

    await author.update({ name });

    response.status(200).send();
  }

  async remove(request, response) {
    const { authorId } = request.params;

    const author = await Author.findByPk(authorId);

    if (!author) {
      throw new AppError('autor não encontrado', 404);
    }

    await author.destroy();

    response.status(204).send();
  }
}

export default new AuthorsController();
