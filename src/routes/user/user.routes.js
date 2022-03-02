import { createUser, userLogin } from '../../controllers/user.controllers';
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

    return res.status(StatusCodes.ACCEPTED).json(response);
  });

  router.get('/login', async (req, res) => {
    const response = await userLogin(req.body);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.CREATED).json(response);
  });

  router.get('/logout', auth, (req, res) => {
    res.clearCookie('auth');
    return res.redirect('/api/');
  });
};

export default userRoutes;
