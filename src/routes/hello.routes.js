import { StatusCodes } from 'http-status-codes';

import auth from './user/verifyToken';

const helloControllers = (router) => {
  router.get('/hello', auth, (_req, res) => {
    res.status(StatusCodes.OK).send({ message: 'Hello from the server' });
  });
};

export default helloControllers;
