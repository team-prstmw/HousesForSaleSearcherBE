import { Router } from 'express';

import helloRoutes from './hello.routes';
import transactionRoutes from './transactions.routes'

const router = Router();

helloRoutes(router);
transactionRoutes(router);

export default router;
