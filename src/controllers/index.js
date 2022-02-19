import { Router } from 'express';

import helloControllers from './hello.controllers';
import transactionControllers from './transactions.controllers'

const router = Router();

helloControllers(router);
transactionControllers(router);

export default router;
