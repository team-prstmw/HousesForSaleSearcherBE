import { Router } from 'express';

import helloControllers from './hello.controllers';

const router = Router();

helloControllers(router);

export default router;
