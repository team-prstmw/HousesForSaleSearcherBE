import { Router } from 'express';

import helloRoutes from './hello.routes';
import transactionRoutes from './transactions.routes'
import favoritesRoutes from './favorites.routes';

const router = Router();

helloRoutes(router);
transactionRoutes(router);
favoritesRoutes(router);

export default router;
