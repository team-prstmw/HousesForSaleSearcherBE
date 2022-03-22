const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = [
  'src/routes/user/user.routes.js',
  'src/routes/houses.routes.js',
  'src/routes/transactions.routes.js',
  './src/routes/favorites.routes.js',
];

swaggerAutogen(outputFile, endpointsFiles);
