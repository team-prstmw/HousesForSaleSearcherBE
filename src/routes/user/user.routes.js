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
import auth from '../../middlewares/verifyToken';

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (requset, file, callback) => {
    callback(null, './src/uploads/images');
  },

  filename: (requset, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
  // eslint-disable-next-line consistent-return
  fileFilter: (requset, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      callback(null, true);
    } else {
      callback(null, false);
      return callback(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

const userRoutes = (router) => {
  router.post('/users', upload.single('avatar'), async (req, res) => {
    // Avatar ta sama nazwa musi być w formulrzu w polu name.

    const response = await createUser(req.body, req.file);

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

  router.patch('/users', auth, async (req, res) => {
    const response = await userEdit(req.body, req.user._id);

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
};

export default userRoutes;
