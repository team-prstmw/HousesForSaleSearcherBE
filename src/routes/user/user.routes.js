import { StatusCodes } from 'http-status-codes';

import { findAllUserFavorites } from '../../controllers/favorites.controllers';
import {
  createUser,
  deleteUser,
  getUserHouses,
  passwdEdit,
  userEdit,
  userLogin,
} from '../../controllers/user.controllers';
import auth from '../../middlewares/verifyToken';

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
    res.cookie('auth', response.token, { maxAge: process.env.MAX_AGE, httpOnly: true });

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });

  router.patch('/users/:id', auth, async (req, res) => {
    const response = await userEdit(req.body, req.params.id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });

  router.patch('/users/:id/passwd', auth, async (req, res) => {
    const response = await passwdEdit(req.body, req.params.id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });

  router.patch('/users/:id/deletion', async (req, res) => {
    const response = await deleteUser(req.params.id);
    res.clearCookie('auth');

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });

  router.get('/users/my-favorites', auth, async (req, res) => {
    const response = await findAllUserFavorites(req.user._id);
    return res.status(StatusCodes.OK).json(response);
  });
  router.post('/logout', auth, (req, res) => {
    res.clearCookie('auth');
    return res.status(StatusCodes.OK).json({ message: 'Logged out' });
  });

  router.get('/users/my-houses', auth, async (req, res) => {
    const response = await getUserHouses(req.user._id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });
};

export default userRoutes;
