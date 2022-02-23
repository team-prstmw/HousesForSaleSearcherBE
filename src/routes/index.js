import { Router } from 'express';

import helloControllers from './hello.routes';
import favoritesControllers from './favorites.routes';
import userRoutes from './user/userRoute';

const router = Router();

helloControllers(router);
favoritesControllers(router);
userRoutes(router);

export default router;
