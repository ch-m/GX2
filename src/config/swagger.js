import { resolve } from 'path';

export default {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'GX2_test',
      version: '0.1.0',
      description: 'api para teste de vaga dev node',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
      contact: {
        name: '',
        url: '',
        email: '',
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    servers: [
      {
        url: process.env.APP_URL,
      },
    ],
  },
  apis: [resolve(__dirname, '..', '..', 'docs', '*.yml')],
};
