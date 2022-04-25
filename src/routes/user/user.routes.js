import { StatusCodes } from 'http-status-codes';

import { findAllUserFavorites } from '../../controllers/favorites.controllers';
import {
  createUser,
  deleteUser,
  getUserHouses,
  passwdEdit,
  userEdit,
  userEditCash,
  userLogin,
} from '../../controllers/user.controllers';
import uploadFilesMiddleware from '../../middlewares/upload';
import auth from '../../middlewares/verifyToken';
import User from '../../models/user';

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

  router.patch('/users', uploadFilesMiddleware, async (req, res) => {
    const response = await userEdit(req.body, req.user._id, req.file);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });

  router.patch('/users/cash', auth, async (req, res) => {
    const response = await userEditCash(req.body, req.user._id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });

  router.patch('/users/passwd', auth, async (req, res) => {
    const response = await passwdEdit(req.body, req.user._id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });

  router.patch('/users/deletion', auth, async (req, res) => {
    const response = await deleteUser(req.user._id);
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

  router.get('/users', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
};

export default userRoutes;
