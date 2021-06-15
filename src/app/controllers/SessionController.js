import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { promisify } from 'util';

import User from '../models/User';
import authConfig from '../../config/auth';
import AppError from '../../errors/AppError';

class SessionController {
  async create(request, response) {
    const { email, password } = request.body;
    
    const user = await User.findOne({
      where: {
        email
      }
    })

    if (!user) {
      throw new AppError('usuario não existe', 401);
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new AppError('senha ou/e e-mail incorretos', 401);
    }

    const { id: userId, administrator: admin } = user;

    const token = await promisify(jwt.sign)(
      { userId, admin },
      authConfig.secret,
      {
        expiresIn: authConfig.expiresIn,
      }
    );

    response.json({
      user,
      token,
    });
  }
}

export default new SessionController();
