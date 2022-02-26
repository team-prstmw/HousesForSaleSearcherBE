import auth from './verifyToken';
import { createUser, userLogin, userDeletion} from '../../controllers/user.controllers';

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

  router.patch('/users/:id', auth, async (req, res) => {
    userDeletion(req, res);
  });
};

export default userRoutes;
