import User from '../models/User';
import AppError from '../../errors/AppError';

class UsersController {
  async index(request, response) {
    const users = await User.findAll();

    response.json(users);
  }

  async create(request, response) {
    const {
      email,
      password,
      confirmPassword,
      administrator = false,
    } = request.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user) {
      throw new AppError('email ja cadastrado', 409);
    } else if (password !== confirmPassword) {
      throw new AppError('as senhas devem ser identicas', 400);
    }

    await User.create({
      email,
      password,
      administrator,
    });

    response.status(201).send();
  }

  async update(request, response) {
    const { userId } = request.params;
    const { email, password, confirmPassword, administrator } = request.body;

    const user = await User.findByPk(userId);

    if (!user) {
      throw new AppError('usuario não encontrado', 404);
    }

    if (password !== confirmPassword) {
      throw new AppError('as senhas devem ser identicas', 400);
    }

    await user.update({
      email,
      password,
      administrator,
    });

    response.status(200).send();
  }

  async remove(request, response) {
    const { userId } = request.params;

    const user = await User.findByPk(userId);

    if (!user) {
      throw new AppError('usuario não encontrado', 404);
    }

    await user.destroy();

    response.status(204).send();
  }
}

export default new UsersController();
