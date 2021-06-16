import AppError from '../../errors/AppError';
import BookReserve from '../models/BookReserve';

class ReturnBookController {
  async create(request, response) {
    const { userId } = request.user;
    const { reserveId } = request.params;

    const reserve = await BookReserve.findByPk(reserveId);

    if (!reserve) {
      throw new AppError('reserva não existe', 400);
    }

    if (reserve.user_id !== userId) {
      throw new AppError('reserva não pertence ao usuario da sessão', 403);
    }

    if (reserve.returned === true) {
      throw new AppError('livro desta reserva ja foi retornado', 409);
    }

    await reserve.update({
      returned: true,
    });

    response.status(200).send();
  }
}

export default new ReturnBookController();
