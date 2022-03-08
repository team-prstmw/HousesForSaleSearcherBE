import { Router } from 'express';

import helloRoutes from './hello.routes';
import transactionRoutes from './transactions.routes';
import userRoutes from './user/user.routes';
import favoritesRoutes from './favorites.routes';
import housesRoutes from './houses.routes';

const router = Router();

helloRoutes(router);
transactionRoutes(router);
userRoutes(router);
favoritesRoutes(router);
housesRoutes(router);

export default router;
