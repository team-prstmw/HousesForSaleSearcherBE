import createNewHouseController from '../controllers/house.controllers';
const { StatusCodes } = require('http-status-codes');
import { houseDeletion } from '../controllers/house.controllers';

const createNewHouseRoutes = (router) => {
  router.post('/create-new-house', async (req, res) => {
    const response = await createNewHouseController(req.body);
    if (!response || !response.status)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'server error' });
    if (response.status === 'invalid') return res.status(StatusCodes.BAD_REQUEST).json(response);
    res.status(StatusCodes.CREATED).json(response);
  });

  router.patch('/houses/:id', auth, async (req, res) => {
    houseDeletion(req, res);
  });
};

export default createNewHouseRoutes;
