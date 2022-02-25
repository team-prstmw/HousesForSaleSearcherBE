import { Router } from 'express';

import helloControllers from './hello.routes';
import favoritesControllers from './favorites.routes';
import userRoutes from './user/userRoute';
import cookieParser from 'cookie-parser';

const router = Router();

router.use(cookieParser());
helloControllers(router);
favoritesControllers(router);
userRoutes(router);

export default router;
