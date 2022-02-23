import { Router } from 'express';

import helloControllers from './hello.routes';
import favoritesControllers from './favorites.routes';
import createNewHouseRoute from './createNewHouse.routes';

const router = Router();

helloControllers(router);
favoritesControllers(router);
createNewHouseRoute(router);

export default router;
