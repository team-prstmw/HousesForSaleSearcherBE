import compression from 'compression';
import express from 'express';
import helmet from 'helmet';

import env from './constants/env';
import routes from './routes';

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger_output.json');
const cors = require('cors');

const options = {
  swaggerOptions: {
    authAction: {
      JWT: {
        name: 'JWT',
        schema: { type: 'http', bearerFormat: 'bearer', scheme: 'http', description: '' },
      },
    },
  },
};

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());
// app.use('/static', express.static('src/uploads/images'));
app.use('/src/uploads/images', express.static('src/uploads/images'));
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// serving client files in production
if (env.NODE_ENV === 'production') {
  app.use(express.static('public'));
}

// upload folder for house images
app.use('/uploads', express.static('src/uploads'));

// gzip compression
app.use(compression());

// api routes
app.use('/api', routes);

app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile, options));

export default app;
