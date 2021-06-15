import 'dotenv/config';
import 'express-async-errors';
import path, { resolve } from 'path';

import express from 'express';
import http from 'http';
import cors from 'cors';
import Youch from 'youch';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import routes from '../routes/index';
import AppError from '../errors/AppError';

import swaggerConfig from '../config/swagger';

import '../database/index';

class App {
  constructor() {
    this.app = express();

    this.middlewares();
    this.server = http.Server(this.app);

    this.routes();

    this.handleGlobalError();
  }

  middlewares() {
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'ejs');
    this.app.set('port', process.env.PORT);
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(routes);
    this.app.use('/', swaggerUi.serve);
    this.app.get('/', swaggerUi.setup(swaggerJsDoc(swaggerConfig)));
  }

  handleGlobalError() {
    this.app.use(async (err, request, response, next) => {
      if (err instanceof AppError) {
        const { message, statusCode } = err;

        return response.status(statusCode).json({ error: message });
      }

      if (
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === 'staging'
      ) {
        console.log(err);
        const { error } = await new Youch(err, request).toJSON();
        return response.status(500).json({
          error: 'internal server error',
          data: error,
        });
      }

      return response.status(500).json({ error: 'internal server error' });
    });
  }
}

export default new App().server;
