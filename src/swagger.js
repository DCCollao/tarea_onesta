const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mi API Express',
      version: '1.0.0',
      description: 'Una API simple creada con Express y documentada con Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.ts'],
};

const specs = swaggerJsDoc(options);

module.exports = specs;
