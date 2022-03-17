import createNewHouseController, { deleteHouse, getHouseList } from '../controllers/house.controllers';
import auth from '../middlewares/verifyToken';
import handleResponse from '../utils/handleResponse';
import parseQuery from '../utils/parseQuery';

const { StatusCodes } = require('http-status-codes');

const createNewHouseRoutes = (router) => {
  router.post('/create-new-house', async (req, res) => {
    const response = await createNewHouseController(req.body);
    if (!response || !response.status)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'server error' });
    if (response.status === 'invalid') return res.status(StatusCodes.BAD_REQUEST).json(response);
    return res.status(StatusCodes.CREATED).json(response);
  });

  router.patch('/houses/:id', auth, async (req, res) => {
    const { id } = req.params;
    const response = await deleteHouse(id, req.user._id);
    handleResponse(response, res, response.status);
  });

  router.get('/houses', async (req, res) => {
    const { query } = req;

    try {
      const filter = parseQuery(query.filter);
      const sort = parseQuery(query.sort);

      const response = await getHouseList(filter, sort);

      if (!response || !response.status) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'server error' });
      }

      if (response.status === 'invalid') {
        return res.status(StatusCodes.BAD_REQUEST).json(response);
      }

      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'server error' });
    }
  });
};

export default createNewHouseRoutes;
