import createNewHouseController, { editHouse, getHouseList } from '../controllers/house.controllers';
import auth from '../middlewares/verifyToken';

const { StatusCodes } = require('http-status-codes');

const createNewHouseRoutes = (router) => {
  router.post('/create-new-house', async (req, res) => {
    const response = await createNewHouseController(req.body);
    if (!response || !response.status)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'server error' });
    if (response.status === 'invalid') return res.status(StatusCodes.BAD_REQUEST).json(response);
    res.status(StatusCodes.CREATED).json(response);
  });

  router.get('/houses-list', async (req, res) => {
    const response = await getHouseList();

    if (!response || !response.status) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'server error' });
    }
    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });

  router.patch('/create-new-house/:id', auth, async (req, res) => {
    const response = await editHouse(req.body, req.params.id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });
};

export default createNewHouseRoutes;
