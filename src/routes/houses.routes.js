import {
  createNewHouse,
  deleteHouse,
  editHouse,
  getHouseDetails,
  getHouseList,
} from '../controllers/house.controllers';
import auth from '../middlewares/verifyToken';
import handleResponse from '../utils/handleResponse';
import parseQuery from '../utils/parseQuery';

const { StatusCodes } = require('http-status-codes');

const housesRoutes = (router) => {
  router.post('/create-new-house', async (req, res) => {
    const response = await createNewHouse(req.body);
    handleResponse(response, res, response.status);
  });

  router.get('/houses/:id', async (req, res) => {
    const response = await getHouseDetails(req.params.id);
    handleResponse(response, res, response.status);
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

  router.put('/houses/:id', auth, async (req, res) => {
    const response = await editHouse(req.body, req.params.id, req.user._id);

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.OK).json(response);
  });
};

export default housesRoutes;
