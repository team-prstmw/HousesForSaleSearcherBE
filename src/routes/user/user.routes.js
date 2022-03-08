import { createUser, userLogin, userEdit, passwdEdit } from '../../controllers/user.controllers';
import { StatusCodes } from 'http-status-codes';
import auth from './verifyToken';

const userRoutes = (router) => {
  router.get('/', (req, res) => {
    res.send('Strona główna zostałeś wylogowany');
  });

  router.post('/users', async (req, res) => {
    const response = await createUser(req.body);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.CREATED).json(response);
  });

  router.get('/login', async (req, res) => {
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

  router.get('/logout', auth, (req, res) => {
    res.clearCookie('auth');
    return res.redirect('/api/');
  });
};

export default userRoutes;
