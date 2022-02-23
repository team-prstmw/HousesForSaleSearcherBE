import { Router } from 'express';

import helloControllers from './hello.routes';
import favoritesRoutes from './favorites.routes';

const router = Router();

helloControllers(router);
favoritesRoutes(router);

export default router;
