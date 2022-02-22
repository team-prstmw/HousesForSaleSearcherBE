import { Router } from 'express';

import helloControllers from './hello.controllers';
import createHouseController from './createNewHouse.controllers';

const router = Router();

helloControllers(router);
createHouseController(router)

export default router;
