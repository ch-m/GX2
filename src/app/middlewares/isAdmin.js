import AppError from '../../errors/AppError';

export default async (request, response, next) => {
  console.log(request.user);
  if (!request.user.admin) {
    throw new AppError(
      'por favor faça login com uma conta de admin antes de tentar acessar este recurso!',
      403
    );
  }

  return next();
};
