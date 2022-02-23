import { Router } from 'express';

import helloControllers from './hello.controllers';
import userRoutes from '../routes/user/userRoute';

const router = Router();

helloControllers(router);
userRoutes(router);

export default router;
