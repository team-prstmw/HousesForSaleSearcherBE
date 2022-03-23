import { StatusCodes } from 'http-status-codes';

import auth from '../middlewares/verifyToken';

const helloControllers = (router) => {
  router.post('/hello', auth, (_req, res) => {
    res.status(StatusCodes.OK).send({ message: 'Hello from the server' });
  });
};

export default helloControllers;
