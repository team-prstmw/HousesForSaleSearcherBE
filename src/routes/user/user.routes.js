import { createUser, userLogin, userEdit, passwdEdit } from '../../controllers/user.controllers';
import { StatusCodes } from 'http-status-codes';
import auth from './verifyToken';

const userRoutes = (router) => {
  router.post('/users', async (req, res) => {
    const response = await createUser(req.body);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.ACCEPTED).json(response);
  });

  router.post('/login', async (req, res) => {
    const response = await userLogin(req.body);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.CREATED).json(response);
  });

  router.patch('/users/:id', async (req, res) => {
    const response = await userEdit(req);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.CREATED).json(response);
  });

  router.patch('/users/:id/passwd', async (req, res) => {
    const response = await passwdEdit(req);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.CREATED).json(response);
  });
};

export default userRoutes;
