import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';
import AppError from '../../errors/AppError';

export default async (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('auth header não informado', 401);
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    throw new AppError('token mal formado', 401);
  }

  try {
    const { userId, admin } = await promisify(jwt.verify)(
      token,
      authConfig.secret
    );

    request.user = { userId, admin };

    return next();
  } catch (error) {
    throw new AppError('token invalido/expirado', 401);
  }
};
