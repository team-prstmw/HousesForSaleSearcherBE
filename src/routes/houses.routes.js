import createNewHouseController from '../controllers/house.controllers';
const { StatusCodes } = require('http-status-codes');
import { getById } from '../controllers/house.controllers';
import handleResponse from '../utils/handleResponse';

const createNewHouseRoutes = (router) => {
  router.post('/create-new-house', async (req, res) => {
    const response = await createNewHouseController(req.body);
    if (!response || !response.status)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'server error' });
    if (response.status === 'invalid') return res.status(StatusCodes.BAD_REQUEST).json(response);
    res.status(StatusCodes.CREATED).json(response);
  });
  router.delete('/houses/:houseId', async (req, res) => {
    const { id } = req.params;
    const response = await getById(id);
    handleResponse(response, res, response.status);
  });
};

export default createNewHouseRoutes;
