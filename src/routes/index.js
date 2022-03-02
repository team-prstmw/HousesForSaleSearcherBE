import { Router } from 'express';

import helloControllers from './hello.routes';
import userRoutes from './user/user.routes';
import favoritesRoutes from './favorites.routes';
import createNewHouseRoute from './houses.routes';

const router = Router();

helloControllers(router);
userRoutes(router);
favoritesRoutes(router);
createNewHouseRoute(router);

export default router;
