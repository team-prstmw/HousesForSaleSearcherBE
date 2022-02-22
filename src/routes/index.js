import { Router } from 'express';

import helloControllers from './hello.routes';
import favoritesControllers from './favorites.routes';

const router = Router();

helloControllers(router);
favoritesControllers(router);

export default router;
