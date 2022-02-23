const { createUser, userLogin, userEdit } = require('../../controllers/user.controllers');

const userRoutes = (router) => {
  router.post('/users', (req, res) => {
    createUser(req.body, res);
  });

  router.post('/login', (req, res) => {
    userLogin(req.body, res);
  });

  router.patch('/users/:id', async (req, res) => {
    userEdit(req, res);
  });
};

export default userRoutes;
