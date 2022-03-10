import cookieParser from 'cookie-parser';
import { Router } from 'express';

import favoritesRoutes from './favorites.routes';
import helloControllers from './hello.routes';
import createNewHouseRoutes from './houses.routes';
import transactionRoutes from './transactions.routes';
import userRoutes from './user/user.routes';

const router = Router();

router.use(cookieParser());
helloControllers(router);
transactionRoutes(router);
userRoutes(router);
favoritesRoutes(router);
createNewHouseRoutes(router);

export default router;
