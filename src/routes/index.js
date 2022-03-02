import { Router } from 'express';

import helloControllers from './hello.routes';
import userRoutes from './user/user.routes';
import favoritesRoutes from './favorites.routes';
import createNewHouseRoutes from './houses.routes';

const router = Router();

helloControllers(router);
userRoutes(router);
favoritesRoutes(router);
createNewHouseRoutes(router);

export default router;
