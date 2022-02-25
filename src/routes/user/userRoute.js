import auth from './verifyToken';
import { createUser, userLogin } from '../../controllers/user.controllers';

const userRoutes = (router) => {
  router.get('/', (req, res) => {
    res.send('Strona główna zostałeś wylogowany');
  });

  router.post('/users', (req, res) => {
    createUser(req.body, res);
  });

  router.get('/login', (req, res) => {
    userLogin(req.body, res);
  });

  router.get('/logout', auth, (req, res) => {
    res.clearCookie('auth');
    return res.redirect('/api/');
  });
};

export default userRoutes;
