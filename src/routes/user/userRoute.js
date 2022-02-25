import auth from './verifyToken';

const { createUser, userLogin } = require('../../controllers/user.controllers');

const userRoutes = (router) => {
  router.post('/users', (req, res) => {
    createUser(req.body, res);
  });

  router.post('/login', (req, res) => {
    userLogin(req.body, res);
  });
};

export default userRoutes;
