import { StatusCodes } from 'http-status-codes';
import transactionController from '../controllers/transaction.controllers';

const transactionRoutes = (router) => {
  router.post('/transactions', async (req, res) => {
    const body = req.body; // {userId: 'buyer', houseId: '', price: 10000}

    const response = await transactionController.buyHouse(body);

    if (!response || !response.status) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'server error' });
    }

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.CREATED).json(response);
  });

  router.get('/transactions/:id', async (req, res) => {
    const { id } = req.params;

    const response = await transactionController.getById(id);
    if (!response || !response.status) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'server error' });
    }

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.CREATED).json(response);
  });
  router.get('/transactions/', async (req, res) => {

    const response = await transactionController.getAll();
    if (!response || !response.status) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'server error' });
    }

    if (response.status === 'invalid') {
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    return res.status(StatusCodes.CREATED).json(response);
  });
};

export default transactionRoutes;
