import { StatusCodes } from 'http-status-codes';

import { findAllUserFavorites } from '../../controllers/favorites.controllers';
import { createUser, passwdEdit, userEdit, userLogin } from '../../controllers/user.controllers';
import auth from './verifyToken';

const userRoutes = (router) => {
  router.post('/users', async (req, res) => {
    const response = await createUser(req.body);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.CREATED).json(response);
  });

  router.post('/login', async (req, res) => {
    const response = await userLogin(req.body);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    res.header(response.header);

    return res.status(StatusCodes.OK).json(response);
  });

  router.patch('/users/:id', async (req, res) => {
    const response = await userEdit(req.body, req.params);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });

  router.patch('/users/:id/passwd', async (req, res) => {
    const response = await passwdEdit(req.body, req.params);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });

  router.get('/users/my-favorites', auth, async (req, res) => {
    const response = await findAllUserFavorites(req.user._id);
    return res.status(StatusCodes.OK).json(response);
  });
};

export default userRoutes;
