import { createNewHouseController } from '../controllers/house.controllers';
import { getHouseDetails } from '../controllers/house.controllers';
const { StatusCodes } = require('http-status-codes');

const housesRoutes = (router) => {
  router.post('/create-new-house', async (req, res) => {
    const response = await createNewHouseController(req.body);
    if (!response || !response.status)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'server error' });
    if (response.status === 'invalid') return res.status(StatusCodes.BAD_REQUEST).json(response);
    res.status(StatusCodes.CREATED).json(response);
  });

  router.get('/house/:id', async (req, res) => {
    const response = await getHouseDetails(req.params.id);
    res.status(StatusCodes.OK).json(response);
  });
};

export default housesRoutes;
