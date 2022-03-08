import { StatusCodes } from 'http-status-codes';

import { createUser, passwdEdit, userDeletion, userEdit, userLogin } from '../../controllers/user.controllers';
import auth from './verifyToken';

const userRoutes = (router) => {
  router.post('/users', async (req, res) => {
    const response = await createUser(req.body);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.CREATED).json(response);
  });

  router.get('/login', async (req, res) => {
    const response = await userLogin(req.body);

    res.cookie('auth', response.message.token, { maxAge: 900000, httpOnly: true });

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });

  router.patch('/users/:id', auth, async (req, res) => {
    const response = await userEdit(req.body, req.params);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });

  router.patch('/users/:id/passwd', auth, async (req, res) => {
    const response = await passwdEdit(req.body, req.params);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });

  router.get('/logout', auth, (req, res) => {
    res.clearCookie('auth');
    return res.status(StatusCodes.NO_CONTENT).json('Wylogowano');
  });

  router.patch('/users/:id', auth, async (req, res) => {
    userDeletion(req, res);
  });
};

export default userRoutes;
