const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Sistema de Agendamento',
      version: '1.0.0',
      description: 'Documentação da API do projeto final com Node, Prisma, JWT e autenticação.',
    },
    servers: [
      {
        url: process.env.APP_URL || 'http://localhost:3001',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJSDoc(options);