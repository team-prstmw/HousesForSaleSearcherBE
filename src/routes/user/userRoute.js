import auth from './verifyToken';

const cookieParser = require('cookie-parser')

const { createUser, userLogin } = require('../../controllers/user.controllers');

const userRoutes = (router) => {
  router.use(cookieParser());

  router.get('/', (req,res) => {
    res.send("Strona główna zostałeś wylogowany");
  })

  router.post('/users', (req, res) => {
    createUser(req.body, res);
  });

  router.get('/login', (req, res) => {
    userLogin(req.body, res);
  });

  router.get('/logout', auth, (req, res) => {
      res.clearCookie("auth");
      return res.redirect("/api/");
  });

};

export default userRoutes;
