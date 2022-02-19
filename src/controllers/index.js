import { Router } from 'express';

import helloControllers from './hello.controllers';
import favoritesControllers from './favorites.controllers';

const router = Router();

helloControllers(router);
favoritesControllers(router);

export default router;
